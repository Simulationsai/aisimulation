import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NodesController } from './nodes.controller'
import { NodesService } from './nodes.service'
import { Node } from '../entities/node.entity'
import { AirdropModule } from '../airdrop/airdrop.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Node]),
    AirdropModule,
  ],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService],
})
export class NodesModule {}
