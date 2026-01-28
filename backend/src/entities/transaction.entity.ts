import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column()
  type: string // 'deposit', 'withdrawal', 'reward', etc.

  @Column('decimal', { precision: 18, scale: 8 })
  amount: number

  @Column({ nullable: true })
  txHash: string

  @Column({ nullable: true })
  address: string

  @Column({ default: 'pending' })
  status: string // 'pending', 'completed', 'failed'

  @CreateDateColumn()
  timestamp: Date
}
