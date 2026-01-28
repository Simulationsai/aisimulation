import { Controller, Post, Body, Get } from '@nestjs/common'
import { WaitlistService } from './waitlist.service'
import { JoinWaitlistDto } from './dto/join-waitlist.dto'

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('join')
  async join(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.join(dto.email)
  }

  @Get('count')
  async getCount() {
    return this.waitlistService.getCount()
  }
}
