import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { NodesService } from './nodes.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('nodes')
@UseGuards(JwtAuthGuard)
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Get()
  async getNodes(@Request() req) {
    return this.nodesService.getNodes(req.user.id)
  }

  @Post('lite')
  async createLiteNode(@Request() req) {
    return this.nodesService.createLiteNode(req.user.id)
  }

  @Post('ultra')
  async createUltraNode(@Request() req, @Body() body: { token: string }) {
    return this.nodesService.createUltraNode(req.user.id, body.token)
  }

  @Get(':id')
  async getNode(@Request() req, @Param('id') id: string) {
    return this.nodesService.getNode(req.user.id, id)
  }

  @Post(':id/start')
  async startNode(@Request() req, @Param('id') id: string) {
    return this.nodesService.startNode(req.user.id, id)
  }

  @Post(':id/stop')
  async stopNode(@Request() req, @Param('id') id: string) {
    return this.nodesService.stopNode(req.user.id, id)
  }

  @Get(':id/metrics')
  async getMetrics(@Request() req, @Param('id') id: string) {
    return this.nodesService.getMetrics(req.user.id, id)
  }

  @Delete(':id')
  async deleteNode(@Request() req, @Param('id') id: string) {
    return this.nodesService.deleteNode(req.user.id, id)
  }
}
