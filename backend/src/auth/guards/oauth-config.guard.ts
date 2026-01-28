import { Injectable, CanActivate, ExecutionContext, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuthConfigGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private provider: 'google' | 'github',
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    let clientId: string;
    let clientSecret: string;

    if (this.provider === 'google') {
      clientId = this.configService.get<string>('GOOGLE_CLIENT_ID') || '';
      clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET') || '';
    } else {
      clientId = this.configService.get<string>('GITHUB_CLIENT_ID') || '';
      clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET') || '';
    }

    if (!clientId || clientId === 'your-google-client-id' || clientId === 'your-github-client-id' ||
        !clientSecret || clientSecret === 'your-google-secret' || clientSecret === 'your-github-secret') {
      response.status(503).json({
        message: `${this.provider === 'google' ? 'Google' : 'GitHub'} OAuth is not configured. Please set ${this.provider.toUpperCase()}_CLIENT_ID and ${this.provider.toUpperCase()}_CLIENT_SECRET environment variables.`,
        error: 'Service Unavailable',
        statusCode: 503,
      });
      return false;
    }

    return true;
  }
}
