import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Node } from '../entities/node.entity'
import { AirdropService } from '../airdrop/airdrop.service'

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private nodeRepository: Repository<Node>,
    private airdropService: AirdropService,
  ) {}

  async getNodes(userId: string) {
    return this.nodeRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    })
  }

  async createLiteNode(userId: string, name?: string) {
    const node = this.nodeRepository.create({
      userId,
      type: 'lite',
      name: name?.trim() || 'Lite Node',
      status: 'active',
      uptime: 99.9,
      earnings: 0,
    })
    await this.nodeRepository.save(node)
    return node
  }

  async createUltraNode(userId: string, token: string, name?: string) {
    const node = this.nodeRepository.create({
      userId,
      type: 'ultra',
      name: name?.trim() || 'Ultra Node',
      status: 'active',
      uptime: 99.5,
      earnings: 0,
      token,
    })
    await this.nodeRepository.save(node)
    return node
  }

  async getNode(userId: string, id: string) {
    const node = await this.nodeRepository.findOne({ where: { id, userId } })
    if (!node) {
      throw new NotFoundException('Node not found')
    }
    return node
  }

  async startNode(userId: string, id: string) {
    const node = await this.getNode(userId, id)
    const wasStopped = node.status !== 'active'
    node.status = 'active'
    await this.nodeRepository.save(node)
    
    // Award XP when node starts (one-time bonus)
    if (wasStopped) {
      // Award 50 XP for starting a node
      await this.airdropService.addNodeXP(userId, 50)
    }
    
    return node
  }

  async calculateNodeXP(userId: string, nodeId: string, uptimeHours: number) {
    // Calculate XP based on node uptime
    // Formula: 10 XP per hour of uptime (max 240 XP per day per node)
    const xpPerHour = 10
    const maxDailyXP = 240
    const calculatedXP = Math.min(uptimeHours * xpPerHour, maxDailyXP)
    
    if (calculatedXP > 0) {
      await this.airdropService.addNodeXP(userId, calculatedXP)
    }
    
    return calculatedXP
  }

  async stopNode(userId: string, id: string) {
    const node = await this.getNode(userId, id)
    node.status = 'stopped'
    await this.nodeRepository.save(node)
    return node
  }

  async getMetrics(userId: string, id: string) {
    const node = await this.getNode(userId, id)
    
    if (node.lastMetrics) {
      return {
        cpu: typeof node.lastMetrics.cpu === 'number' ? node.lastMetrics.cpu : Math.random() * 100,
        memory: typeof node.lastMetrics.memory === 'number' ? node.lastMetrics.memory : Math.random() * 100,
        bandwidth: typeof node.lastMetrics.bandwidth === 'number' ? node.lastMetrics.bandwidth : Math.random() * 1000,
        latency: typeof node.lastMetrics.latency === 'number' ? node.lastMetrics.latency : Math.random() * 50,
        tasksCompleted:
          typeof node.lastMetrics.tasksCompleted === 'number' ? node.lastMetrics.tasksCompleted : Math.floor(Math.random() * 1000),
        lastSeenAt: node.lastSeenAt,
      }
    }

    // Return mock metrics (until real metrics reported)
    return {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      bandwidth: Math.random() * 1000,
      latency: Math.random() * 50,
      tasksCompleted: Math.floor(Math.random() * 1000),
      lastSeenAt: node.lastSeenAt,
    }
  }

  async reportNode(
    userId: string,
    nodeId: string,
    payload: {
      uptimeHours: number
      metrics?: { cpu?: number; memory?: number; bandwidth?: number; latency?: number; tasksCompleted?: number }
    },
  ) {
    const node = await this.getNode(userId, nodeId)
    if (node.status !== 'active') {
      throw new ConflictException('Node is stopped')
    }
    const xpAwarded = await this.calculateNodeXP(userId, nodeId, payload.uptimeHours)

    node.lastSeenAt = new Date()
    node.lastMetrics = payload.metrics || null
    // Treat earnings as XP earnings for now (UI uses XP)
    node.earnings = Number(node.earnings || 0) + Number(xpAwarded || 0)
    await this.nodeRepository.save(node)

    return { node, xpAwarded }
  }

  async deleteNode(userId: string, id: string) {
    const node = await this.getNode(userId, id)
    await this.nodeRepository.remove(node)
    return { success: true }
  }
}
