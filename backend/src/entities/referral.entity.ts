import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { AirdropUser } from './airdrop-user.entity'

@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => AirdropUser)
  @JoinColumn({ name: 'referrerId' })
  referrer: AirdropUser

  @Column()
  referrerId: string

  @ManyToOne(() => AirdropUser)
  @JoinColumn({ name: 'inviteeId' })
  invitee: AirdropUser

  @Column()
  inviteeId: string

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  totalXPByInvitee: number // Total XP earned by invitee

  @Column('decimal', { precision: 18, scale: 2, default: 0 })
  referrerXP: number // 10% of invitee's XP

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
