import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity'
import { Wallet } from '../entities/wallet.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async register(name: string, email: string, password: string) {
    // Validate input
    if (!name || !email || !password) {
      throw new BadRequestException('Name, email, and password are required')
    }

    // Check if user exists
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = this.userRepository.create({
      name,
      username: name,
      email,
      password: hashedPassword,
    })
    await this.userRepository.save(user)

    // Create wallet for user
    const wallet = this.walletRepository.create({
      userId: user.id,
      balance: 0,
      staked: 0,
      pending: 0,
    })
    await this.walletRepository.save(wallet)

    // Generate token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return {
      token,
      user: { id: user.id, name: user.name, username: user.username, email: user.email },
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Generate token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return {
      token,
      user: { id: user.id, name: user.name, username: user.username, email: user.email },
    }
  }

  async walletLogin(walletAddress: string) {
    if (!walletAddress) {
      throw new BadRequestException('Wallet address is required')
    }

    const normalized = walletAddress.toLowerCase()

    let user = await this.userRepository.findOne({ where: { walletAddress: normalized } })

    if (!user) {
      // Create a minimal user account tied to this wallet
      user = this.userRepository.create({
        name: `Wallet User ${normalized.slice(0, 6)}`,
        username: `wallet_${normalized.slice(2, 8)}`,
        email: `${normalized}@wallet.local`,
        password: '', // wallet users authenticate via wallet, not password
        walletAddress: normalized,
      })
      await this.userRepository.save(user)

      const wallet = this.walletRepository.create({
        userId: user.id,
        balance: 0,
        staked: 0,
        pending: 0,
      })
      await this.walletRepository.save(wallet)
    }

    const token = `token_${user.id}_${Date.now()}`

    return {
      token,
      user: { id: user.id, name: user.name, username: user.username, email: user.email, walletAddress: user.walletAddress },
    }
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    return { id: user.id, name: user.name, email: user.email }
  }

  async validateToken(token: string) {
    // In production, validate JWT token
    // For now, extract user ID from token
    const match = token.match(/token_([^_]+)_/)
    if (!match) return null
    
    const userId = match[1]
    return await this.userRepository.findOne({ where: { id: userId } })
  }

  async oauthLogin(profile: any) {
    const { email, name, provider } = profile

    // Check if user exists
    let user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      // Create new user for OAuth
      user = this.userRepository.create({
        name,
        username: name,
        email,
        password: '', // OAuth users don't have passwords
      })
      await this.userRepository.save(user)

      // Create wallet for user
      const wallet = this.walletRepository.create({
        userId: user.id,
        balance: 0,
        staked: 0,
        pending: 0,
      })
      await this.walletRepository.save(wallet)
    }

    // Generate token
    const token = `token_${user.id}_${Date.now()}`

    return {
      token,
      user: { id: user.id, name: user.name, username: user.username, email: user.email },
    }
  }
}
