import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Waitlist } from '../entities/waitlist.entity'

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(Waitlist)
    private waitlistRepository: Repository<Waitlist>,
  ) {}

  async join(email: string) {
    // Check if already exists
    const existing = await this.waitlistRepository.findOne({ where: { email } })
    if (existing) {
      return {
        success: false,
        message: 'Email already registered',
        alreadyRegistered: true,
      }
    }

    // Create new entry
    const entry = this.waitlistRepository.create({ email })
    await this.waitlistRepository.save(entry)

    const count = await this.waitlistRepository.count()

    return {
      success: true,
      message: 'Successfully joined waitlist',
      position: count,
      totalCount: count,
    }
  }

  async getCount() {
    const count = await this.waitlistRepository.count()
    return { count }
  }
}
