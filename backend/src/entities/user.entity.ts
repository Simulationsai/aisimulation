import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  walletAddress: string

  @Column({ nullable: true })
  twitterHandle: string

  @Column({ nullable: true })
  discordHandle: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
