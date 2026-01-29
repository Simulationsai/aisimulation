import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'
import { Wallet } from '../entities/wallet.entity'
import { Transaction } from '../entities/transaction.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Transaction]), AuthModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
