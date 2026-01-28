import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      twitterHandle: user.twitterHandle,
      discordHandle: user.discordHandle,
    }
  }

  async updateProfile(userId: string, updates: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (updates.email && updates.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: updates.email },
      })
      if (existing && existing.id !== user.id) {
        throw new ConflictException('Email is already in use')
      }
    }

    if (updates.walletAddress) {
      updates.walletAddress = updates.walletAddress.toLowerCase()
    }

    Object.assign(user, updates)
    await this.userRepository.save(user)

    return this.getProfile(userId)
  }
}
