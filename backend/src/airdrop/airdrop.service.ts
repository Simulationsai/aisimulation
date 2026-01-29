import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AirdropUser } from '../entities/airdrop-user.entity'
import { Referral } from '../entities/referral.entity'
import { AirdropTask, TaskType, TaskStatus } from '../entities/airdrop-task.entity'
import { User } from '../entities/user.entity'
import * as crypto from 'crypto'

@Injectable()
export class AirdropService {
  constructor(
    @InjectRepository(AirdropUser)
    private airdropUserRepository: Repository<AirdropUser>,
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
    @InjectRepository(AirdropTask)
    private airdropTaskRepository: Repository<AirdropTask>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getOrCreateAirdropUser(userId: string) {
    let airdropUser = await this.airdropUserRepository.findOne({
      where: { userId },
    })

    if (!airdropUser) {
      // Generate unique referral code
      const referralCode = this.generateReferralCode(userId)
      
      airdropUser = this.airdropUserRepository.create({
        userId,
        referralCode,
        totalXP: 0,
        taskXP: 0,
        nodeXP: 0,
        referralXP: 0,
        simuTokens: null,
      })
      await this.airdropUserRepository.save(airdropUser)
    }

    return airdropUser
  }

  async getAirdropUser(userId: string) {
    const airdropUser = await this.airdropUserRepository.findOne({
      where: { userId },
      relations: ['user', 'referrals', 'referrals.invitee'],
    })

    if (!airdropUser) {
      throw new NotFoundException('Airdrop user not found')
    }

    return airdropUser
  }

  async getAirdropUserByReferralCode(referralCode: string) {
    return await this.airdropUserRepository.findOne({
      where: { referralCode },
    })
  }

  async registerWithReferral(userId: string, referralCode: string) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)
    
    // Check if already referred
    if (airdropUser.referredBy) {
      throw new BadRequestException('User already registered with a referral code')
    }

    // Find referrer
    const referrer = await this.getAirdropUserByReferralCode(referralCode)
    if (!referrer) {
      throw new NotFoundException('Invalid referral code')
    }

    if (referrer.userId === userId) {
      throw new BadRequestException('Cannot use your own referral code')
    }

    // Create referral relationship
    airdropUser.referredBy = referralCode
    await this.airdropUserRepository.save(airdropUser)

    const referral = this.referralRepository.create({
      referrerId: referrer.id,
      inviteeId: airdropUser.id,
      totalXPByInvitee: 0,
      referrerXP: 0,
    })
    await this.referralRepository.save(referral)

    return airdropUser
  }

  async updateTwitterInfo(userId: string, twitterHandle: string, twitterUserId?: string) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)
    airdropUser.twitterHandle = twitterHandle
    if (twitterUserId) {
      airdropUser.twitterUserId = twitterUserId
    }
    await this.airdropUserRepository.save(airdropUser)
    return airdropUser
  }

  async completeMandatoryTask(userId: string, taskType: TaskType, proof?: string) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)

    // Check if task already completed
    const existingTask = await this.airdropTaskRepository.findOne({
      where: {
        airdropUserId: airdropUser.id,
        taskType,
        status: TaskStatus.COMPLETED,
      },
    })

    if (existingTask) {
      throw new BadRequestException('Task already completed')
    }

    // Update airdrop user status based on task type
    const xpReward = this.getTaskXPReward(taskType)
    
    switch (taskType) {
      case TaskType.MANDATORY_FOLLOW:
        airdropUser.twitterFollowed = true
        break
      case TaskType.MANDATORY_RETWEET:
        airdropUser.twitterRetweeted = true
        break
      case TaskType.MANDATORY_LIKE_COMMENT:
        airdropUser.twitterLiked = true
        airdropUser.twitterCommented = true
        break
    }

    // Create task record
    const task = this.airdropTaskRepository.create({
      airdropUserId: airdropUser.id,
      taskType,
      status: TaskStatus.COMPLETED,
      xpReward,
      verificationProof: proof,
    })
    await this.airdropTaskRepository.save(task)

    // Update XP
    airdropUser.taskXP = this.toNumber(airdropUser.taskXP) + this.toNumber(xpReward)
    airdropUser.totalXP = this.toNumber(airdropUser.totalXP) + this.toNumber(xpReward)
    await this.airdropUserRepository.save(airdropUser)

    // Update referrer XP if applicable
    if (airdropUser.referredBy) {
      await this.updateReferrerXP(airdropUser.id, xpReward)
    }

    return { task, airdropUser }
  }

  async completeOptionalTask(userId: string, taskType: TaskType, proof?: string) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)

    // Check daily like - can only do once per day
    if (taskType === TaskType.OPTIONAL_DAILY_LIKE) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (airdropUser.lastDailyLikeDate && new Date(airdropUser.lastDailyLikeDate) >= today) {
        throw new BadRequestException('Daily like already completed today')
      }

      airdropUser.dailyLikeCompleted = true
      airdropUser.lastDailyLikeDate = new Date()
      airdropUser.dailyLikesCount += 1
    } else if (taskType === TaskType.OPTIONAL_REPOST) {
      airdropUser.repostsCount += 1
    } else if (taskType === TaskType.OPTIONAL_COMMENT) {
      airdropUser.commentsCount += 1
    }

    const xpReward = this.getTaskXPReward(taskType)

    // Create task record
    const task = this.airdropTaskRepository.create({
      airdropUserId: airdropUser.id,
      taskType,
      status: TaskStatus.COMPLETED,
      xpReward,
      verificationProof: proof,
    })
    await this.airdropTaskRepository.save(task)

    // Update XP
    airdropUser.taskXP = this.toNumber(airdropUser.taskXP) + this.toNumber(xpReward)
    airdropUser.totalXP = this.toNumber(airdropUser.totalXP) + this.toNumber(xpReward)
    await this.airdropUserRepository.save(airdropUser)

    // Update referrer XP if applicable
    if (airdropUser.referredBy) {
      await this.updateReferrerXP(airdropUser.id, xpReward)
    }

    return { task, airdropUser }
  }

  async updateReferrerXP(inviteeAirdropUserId: string, inviteeXP: number) {
    const invitee = await this.airdropUserRepository.findOne({
      where: { id: inviteeAirdropUserId },
    })

    if (!invitee || !invitee.referredBy) {
      return
    }

    const referrer = await this.getAirdropUserByReferralCode(invitee.referredBy)
    if (!referrer) {
      return
    }

    // Calculate 10% for referrer
    const referrerBonusXP = inviteeXP * 0.1

    // Update referral record
    const referral = await this.referralRepository.findOne({
      where: {
        referrerId: referrer.id,
        inviteeId: invitee.id,
      },
    })

    if (referral) {
      referral.totalXPByInvitee = this.toNumber(referral.totalXPByInvitee) + this.toNumber(inviteeXP)
      referral.referrerXP = this.toNumber(referral.referrerXP) + this.toNumber(referrerBonusXP)
      await this.referralRepository.save(referral)
    }

    // Update referrer's total referral XP
    referrer.referralXP = this.toNumber(referrer.referralXP) + this.toNumber(referrerBonusXP)
    referrer.totalXP = this.toNumber(referrer.totalXP) + this.toNumber(referrerBonusXP)
    await this.airdropUserRepository.save(referrer)
  }

  async addNodeXP(userId: string, xpAmount: number) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)
    airdropUser.nodeXP = this.toNumber(airdropUser.nodeXP) + this.toNumber(xpAmount)
    airdropUser.totalXP = this.toNumber(airdropUser.totalXP) + this.toNumber(xpAmount)
    await this.airdropUserRepository.save(airdropUser)

    // Update referrer XP if applicable
    if (airdropUser.referredBy) {
      await this.updateReferrerXP(airdropUser.id, xpAmount)
    }

    return airdropUser
  }

  async getUserTasks(userId: string) {
    const airdropUser = await this.getOrCreateAirdropUser(userId)
    
    const tasks = await this.airdropTaskRepository.find({
      where: { airdropUserId: airdropUser.id },
      order: { createdAt: 'DESC' },
    })

    // Load user relation if needed
    if (!airdropUser.user) {
      airdropUser.user = await this.userRepository.findOne({ where: { id: userId } })
    }

    return {
      airdropUser: {
        id: airdropUser.id,
        userId: airdropUser.userId,
        referralCode: airdropUser.referralCode,
        referredBy: airdropUser.referredBy,
        totalXP: parseFloat(airdropUser.totalXP.toString()),
        taskXP: parseFloat(airdropUser.taskXP.toString()),
        nodeXP: parseFloat(airdropUser.nodeXP.toString()),
        referralXP: parseFloat(airdropUser.referralXP.toString()),
        simuTokens: airdropUser.simuTokens ? parseFloat(airdropUser.simuTokens.toString()) : null,
        twitterHandle: airdropUser.twitterHandle,
        twitterFollowed: airdropUser.twitterFollowed,
        twitterRetweeted: airdropUser.twitterRetweeted,
        twitterLiked: airdropUser.twitterLiked,
        twitterCommented: airdropUser.twitterCommented,
        dailyLikeCompleted: airdropUser.dailyLikeCompleted,
        repostsCount: airdropUser.repostsCount,
        commentsCount: airdropUser.commentsCount,
      },
      tasks: tasks.map(t => ({
        id: t.id,
        taskType: t.taskType,
        status: t.status,
        xpReward: parseFloat(t.xpReward.toString()),
        createdAt: t.createdAt,
      })),
      mandatoryTasks: {
        follow: airdropUser.twitterFollowed,
        retweet: airdropUser.twitterRetweeted,
        likeComment: airdropUser.twitterLiked && airdropUser.twitterCommented,
      },
      optionalTasks: {
        dailyLike: airdropUser.dailyLikeCompleted,
        reposts: airdropUser.repostsCount,
        comments: airdropUser.commentsCount,
      },
    }
  }

  async getReferralStats(userId: string) {
    const airdropUser = await this.getAirdropUser(userId)
    
    const referrals = await this.referralRepository.find({
      where: { referrerId: airdropUser.id },
      relations: ['invitee'],
    })

    // Load user info for each invitee
    const       referralsWithUsers = await Promise.all(
      referrals.map(async (r) => {
        const inviteeUser = await this.userRepository.findOne({ where: { id: r.invitee.userId } })
        return {
          inviteeEmail: inviteeUser?.email || 'Unknown',
          totalXPByInvitee: parseFloat(r.totalXPByInvitee.toString()),
          referrerXP: parseFloat(r.referrerXP.toString()),
          createdAt: r.createdAt,
        }
      })
    )

    return {
      referralCode: airdropUser.referralCode,
      totalReferrals: referrals.length,
      totalReferralXP: parseFloat(airdropUser.referralXP.toString()),
      referrals: referralsWithUsers,
    }
  }

  async convertXPToSIMU(userId: string, conversionRate: number) {
    const airdropUser = await this.getAirdropUser(userId)
    
    if (airdropUser.simuTokens !== null) {
      throw new BadRequestException('XP already converted to SIMU tokens')
    }

    const simuAmount = this.toNumber(airdropUser.totalXP) * this.toNumber(conversionRate)
    airdropUser.simuTokens = simuAmount
    await this.airdropUserRepository.save(airdropUser)

    return { simuTokens: simuAmount, totalXP: this.toNumber(airdropUser.totalXP) }
  }

  private toNumber(value: any): number {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
      const n = Number(value)
      return Number.isFinite(n) ? n : 0
    }
    if (value == null) return 0
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
  }

  private generateReferralCode(userId: string): string {
    const hash = crypto.createHash('md5').update(userId + Date.now()).digest('hex')
    return `SIMU${hash.substring(0, 8).toUpperCase()}`
  }

  private getTaskXPReward(taskType: TaskType): number {
    const rewards = {
      [TaskType.MANDATORY_FOLLOW]: 100,
      [TaskType.MANDATORY_RETWEET]: 200,
      [TaskType.MANDATORY_LIKE_COMMENT]: 150,
      [TaskType.OPTIONAL_DAILY_LIKE]: 50,
      [TaskType.OPTIONAL_REPOST]: 75,
      [TaskType.OPTIONAL_COMMENT]: 50,
    }
    return rewards[taskType] || 0
  }
}
