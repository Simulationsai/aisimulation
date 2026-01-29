import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { randomBytes } from 'crypto'
import { ApiKey } from '../entities/api-key.entity'

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {}

  async getApiKeys(userId: string) {
    return this.apiKeyRepository.find({
      where: { userId },
      order: { created: 'DESC' },
    })
  }

  async createApiKey(userId: string, name: string) {
    const prefix = name.toLowerCase().includes('production') ? 'sk_live_' : 'sk_test_'
    const key = prefix + randomBytes(24).toString('hex')
    
    const apiKey = this.apiKeyRepository.create({
      userId,
      name,
      key,
      usage: 0,
      limit: name.toLowerCase().includes('production') ? 10000 : 5000,
    })
    await this.apiKeyRepository.save(apiKey)

    return apiKey
  }

  async deleteApiKey(userId: string, id: string) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { id, userId } })
    if (!apiKey) {
      throw new Error('API key not found')
    }
    await this.apiKeyRepository.remove(apiKey)
    return { success: true }
  }

  async getUsage(userId: string, id: string) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { id, userId } })
    if (!apiKey) {
      throw new Error('API key not found')
    }
    
    return {
      requests: apiKey.usage,
      lastUsed: apiKey.lastUsed,
      limit: apiKey.limit,
    }
  }

  async findByKey(key: string) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { key } })
    if (!apiKey) return null

    // Update usage tracking
    apiKey.usage += 1
    apiKey.lastUsed = new Date()
    await this.apiKeyRepository.save(apiKey)

    return apiKey
  }
}
