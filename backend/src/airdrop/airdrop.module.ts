import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AirdropController } from './airdrop.controller'
import { AirdropService } from './airdrop.service'
import { AirdropUser } from '../entities/airdrop-user.entity'
import { Referral } from '../entities/referral.entity'
import { AirdropTask } from '../entities/airdrop-task.entity'
import { User } from '../entities/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AirdropUser, Referral, AirdropTask, User]),
    AuthModule,
  ],
  controllers: [AirdropController],
  providers: [AirdropService],
  exports: [AirdropService],
})
export class AirdropModule {}
