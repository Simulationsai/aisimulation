import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common'
import { WalletService } from './wallet.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Request() req) {
    return this.walletService.getBalance(req.user.id)
  }

  @Post('deposit')
  async deposit(@Request() req, @Body() body: { amount: number; txHash: string }) {
    return this.walletService.deposit(req.user.id, body.amount, body.txHash)
  }

  @Post('withdraw')
  async withdraw(@Request() req, @Body() body: { amount: number; address: string }) {
    return this.walletService.withdraw(req.user.id, body.amount, body.address)
  }

  @Get('transactions')
  async getTransactions(@Request() req) {
    return this.walletService.getTransactions(req.user.id)
  }

  @Get('address')
  async getDepositAddress(@Request() req) {
    return this.walletService.getDepositAddress(req.user.id)
  }
}
