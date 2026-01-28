import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GitHubStrategy } from './strategies/github.strategy';
import { User } from '../entities/user.entity';
import { Wallet } from '../entities/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wallet]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, GoogleStrategy, GitHubStrategy],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
