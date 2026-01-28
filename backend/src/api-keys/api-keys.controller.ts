import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { ApiKeysService } from './api-keys.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('api-keys')
@UseGuards(JwtAuthGuard)
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get()
  async getApiKeys(@Request() req) {
    return this.apiKeysService.getApiKeys(req.user.id)
  }

  @Post()
  async createApiKey(@Request() req, @Body() body: { name: string }) {
    return this.apiKeysService.createApiKey(req.user.id, body.name)
  }

  @Delete(':id')
  async deleteApiKey(@Request() req, @Param('id') id: string) {
    return this.apiKeysService.deleteApiKey(req.user.id, id)
  }

  @Get('usage/:id')
  async getUsage(@Request() req, @Param('id') id: string) {
    return this.apiKeysService.getUsage(req.user.id, id)
  }
}
