import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  walletAddress?: string

  @IsOptional()
  @IsString()
  twitterHandle?: string

  @IsOptional()
  @IsString()
  discordHandle?: string
}
