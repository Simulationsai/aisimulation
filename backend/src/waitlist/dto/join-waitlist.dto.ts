import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinWaitlistDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
