import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('airdrop_users')
export class AirdropUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column({ unique: true, nullable: true })
  referralCode: string

  @Column({ nullable: true })
  referredBy: string // referral code of the person who referred them

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  totalXP: number // Total XP earned from all sources

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  taskXP: number // XP from Twitter tasks

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  nodeXP: number // XP from running nodes

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  referralXP: number // XP from referrals (10% of invitee's XP)

  @Column('decimal', { precision: 18, scale: 8, default: 0, nullable: true })
  simuTokens: number // Converted SIMU tokens at TGE (null before TGE)

  @Column({ nullable: true })
  twitterHandle: string

  @Column({ nullable: true })
  twitterUserId: string

  @Column({ default: false })
  twitterFollowed: boolean

  @Column({ default: false })
  twitterRetweeted: boolean

  @Column({ default: false })
  twitterLiked: boolean

  @Column({ default: false })
  twitterCommented: boolean

  @Column({ default: false })
  dailyLikeCompleted: boolean

  @Column({ nullable: true })
  lastDailyLikeDate: Date

  @Column({ default: 0 })
  dailyLikesCount: number

  @Column({ default: 0 })
  repostsCount: number

  @Column({ default: 0 })
  commentsCount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
