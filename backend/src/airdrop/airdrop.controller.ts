import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common'
import { AirdropService } from './airdrop.service'
import { TaskType } from '../entities/airdrop-task.entity'
import { AuthModule } from '../auth/auth.module'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('airdrop')
export class AirdropController {
  constructor(private readonly airdropService: AirdropService) {}

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@Request() req) {
    return await this.airdropService.getUserTasks(req.user.id)
  }

  @Get('referral-stats')
  @UseGuards(JwtAuthGuard)
  async getReferralStats(@Request() req) {
    return await this.airdropService.getReferralStats(req.user.id)
  }

  @Post('register-referral')
  @UseGuards(JwtAuthGuard)
  async registerWithReferral(@Request() req, @Body() body: { referralCode: string }) {
    return await this.airdropService.registerWithReferral(req.user.id, body.referralCode)
  }

  @Post('update-twitter')
  @UseGuards(JwtAuthGuard)
  async updateTwitter(@Request() req, @Body() body: { twitterHandle: string; twitterUserId?: string }) {
    return await this.airdropService.updateTwitterInfo(req.user.id, body.twitterHandle, body.twitterUserId)
  }

  @Post('complete-mandatory-task')
  @UseGuards(JwtAuthGuard)
  async completeMandatoryTask(
    @Request() req,
    @Body() body: { taskType: TaskType; proof?: string },
  ) {
    return await this.airdropService.completeMandatoryTask(req.user.id, body.taskType, body.proof)
  }

  @Post('complete-optional-task')
  @UseGuards(JwtAuthGuard)
  async completeOptionalTask(
    @Request() req,
    @Body() body: { taskType: TaskType; proof?: string },
  ) {
    return await this.airdropService.completeOptionalTask(req.user.id, body.taskType, body.proof)
  }

  @Get('referral-code/:code')
  async getReferralInfo(@Param('code') code: string) {
    const user = await this.airdropService.getAirdropUserByReferralCode(code)
    if (!user) {
      return { valid: false }
    }
    return { valid: true, code }
  }

  @Post('calculate-node-xp')
  @UseGuards(JwtAuthGuard)
  async calculateNodeXP(
    @Request() req,
    @Body() body: { nodeId: string; uptimeHours: number },
  ) {
    // This would typically be called by a cron job or node monitoring service
    // For now, we'll expose it as an endpoint
    return await this.airdropService.addNodeXP(req.user.id, body.uptimeHours * 10)
  }
}
