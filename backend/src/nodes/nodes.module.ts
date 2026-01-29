import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NodesController } from './nodes.controller'
import { NodesService } from './nodes.service'
import { Node } from '../entities/node.entity'
import { AirdropModule } from '../airdrop/airdrop.module'
import { ApiKeysModule } from '../api-keys/api-keys.module'
import { NodeClientController } from './node-client.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Node]),
    AirdropModule,
    ApiKeysModule,
    AuthModule,
  ],
  controllers: [NodesController, NodeClientController],
  providers: [NodesService],
  exports: [NodesService],
})
export class NodesModule {}
