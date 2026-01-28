import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @Column()
  name: string

  @Column({ unique: true })
  key: string

  @Column({ default: 0 })
  usage: number

  @Column({ default: 10000 })
  limit: number

  @Column({ nullable: true })
  lastUsed: Date

  @CreateDateColumn()
  created: Date
}
