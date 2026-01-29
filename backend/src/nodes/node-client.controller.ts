import { Body, Controller, Post, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common'
import { NodesService } from './nodes.service'
import { ApiKeysService } from '../api-keys/api-keys.service'

@Controller('nodes/client')
export class NodeClientController {
  constructor(
    private readonly nodesService: NodesService,
    private readonly apiKeysService: ApiKeysService,
  ) {}

  @Post('register')
  async registerNode(
    @Body()
    body: {
      nodeKey: string
      type: 'lite' | 'ultra'
      name?: string
    },
  ) {
    const nodeKey = (body.nodeKey || '').trim()
    const type = body.type
    const name = (body.name || '').trim()

    if (!nodeKey) throw new BadRequestException('nodeKey is required')
    if (type !== 'lite' && type !== 'ultra') throw new BadRequestException('type must be lite or ultra')

    const apiKey = await this.apiKeysService.findByKey(nodeKey)
    if (!apiKey) throw new UnauthorizedException('Invalid node key')

    // Create a node record for the owner of this key
    const node =
      type === 'lite'
        ? await this.nodesService.createLiteNode(apiKey.userId, name)
        : await this.nodesService.createUltraNode(apiKey.userId, nodeKey, name)

    return { node }
  }

  @Post('report')
  async report(
    @Body()
    body: {
      nodeKey: string
      nodeId: string
      uptimeHours: number
      metrics?: { cpu?: number; memory?: number; bandwidth?: number; latency?: number; tasksCompleted?: number }
    },
  ) {
    const nodeKey = (body.nodeKey || '').trim()
    const nodeId = (body.nodeId || '').trim()
    const uptimeHours = Number(body.uptimeHours)

    if (!nodeKey) throw new BadRequestException('nodeKey is required')
    if (!nodeId) throw new BadRequestException('nodeId is required')
    if (!Number.isFinite(uptimeHours) || uptimeHours <= 0) throw new BadRequestException('uptimeHours must be a positive number')

    const apiKey = await this.apiKeysService.findByKey(nodeKey)
    if (!apiKey) throw new UnauthorizedException('Invalid node key')

    // Ensure node belongs to this user
    const node = await this.nodesService.getNode(apiKey.userId, nodeId)
    if (!node) throw new ForbiddenException('Node not found or not owned by this key')

    const { xpAwarded } = await this.nodesService.reportNode(apiKey.userId, nodeId, {
      uptimeHours,
      metrics: body.metrics,
    })

    return { nodeId, xpAwarded }
  }
}

