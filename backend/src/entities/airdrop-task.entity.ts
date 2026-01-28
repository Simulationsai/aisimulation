import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { AirdropUser } from './airdrop-user.entity'

export enum TaskType {
  MANDATORY_FOLLOW = 'mandatory_follow',
  MANDATORY_RETWEET = 'mandatory_retweet',
  MANDATORY_LIKE_COMMENT = 'mandatory_like_comment',
  OPTIONAL_DAILY_LIKE = 'optional_daily_like',
  OPTIONAL_REPOST = 'optional_repost',
  OPTIONAL_COMMENT = 'optional_comment',
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

@Entity('airdrop_tasks')
export class AirdropTask {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => AirdropUser)
  @JoinColumn({ name: 'airdropUserId' })
  airdropUser: AirdropUser

  @Column()
  airdropUserId: string

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  taskType: TaskType

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  xpReward: number // XP reward for this task

  @Column({ nullable: true })
  twitterPostId: string

  @Column({ nullable: true })
  verificationProof: string // URL or text proof

  @Column({ nullable: true })
  notes: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
