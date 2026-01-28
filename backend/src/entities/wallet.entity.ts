import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  balance: number

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  staked: number

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  pending: number

  @Column({ nullable: true })
  depositAddress: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
