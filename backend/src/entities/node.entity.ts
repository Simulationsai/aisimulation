import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('nodes')
export class Node {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column()
  type: string // 'lite' or 'ultra'

  @Column()
  name: string

  @Column({ default: 'stopped' })
  status: string // 'active', 'stopped', 'error'

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  uptime: number

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  earnings: number

  @Column({ nullable: true })
  token: string // For Ultra nodes

  @Column({ type: 'timestamptz', nullable: true })
  lastSeenAt: Date | null

  @Column({ type: 'jsonb', nullable: true })
  lastMetrics: {
    cpu?: number
    memory?: number
    bandwidth?: number
    latency?: number
    tasksCompleted?: number
  } | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
