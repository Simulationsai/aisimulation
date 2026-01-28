import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus, Req, Res, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { name: string; email: string; password: string }) {
    try {
      return await this.authService.register(body.name, body.email, body.password)
    } catch (error) {
      throw error
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password)
  }

  @Post('wallet-login')
  async walletLogin(@Body() body: { walletAddress: string }) {
    return this.authService.walletLogin(body.walletAddress)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id)
  }

  // Google OAuth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any, @Res() res: Response) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID')
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET')
    
    // Check if credentials are configured (this runs after guard, but we handle error in callback)
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3002'}/login?error=oauth_failed`)
      }
      const result = await this.authService.oauthLogin(req.user)
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3002'
      res.redirect(`${frontendUrl}/auth/callback?token=${result.token}&user=${encodeURIComponent(JSON.stringify(result.user))}`)
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3002'
      res.redirect(`${frontendUrl}/login?error=oauth_failed`)
    }
  }

  // GitHub OAuth
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req: any, @Res() res: Response) {
    // Guard redirects to GitHub
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3002'}/login?error=oauth_failed`)
      }
      const result = await this.authService.oauthLogin(req.user)
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3002'
      res.redirect(`${frontendUrl}/auth/callback?token=${result.token}&user=${encodeURIComponent(JSON.stringify(result.user))}`)
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3002'
      res.redirect(`${frontendUrl}/login?error=oauth_failed`)
    }
  }
}
