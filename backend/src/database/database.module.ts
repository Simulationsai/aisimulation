import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL')
        
        // Parse DATABASE_URL if provided and valid
        if (databaseUrl && databaseUrl.trim() !== '' && databaseUrl !== 'undefined') {
          try {
            // Log the URL (without password) for debugging
            const urlForLogging = databaseUrl.replace(/:[^:@]+@/, ':****@')
            console.log('🔗 Attempting to parse DATABASE_URL:', urlForLogging.substring(0, 50) + '...')
            
            const url = new URL(databaseUrl)
            
            // Extract database name from pathname
            let database = url.pathname.slice(1) // Remove leading /
            if (!database) {
              database = 'simulationsai' // Fallback
            }
            
            const dbConfig = {
              type: 'postgres' as const,
              host: url.hostname,
              port: parseInt(url.port) || 5432,
              username: decodeURIComponent(url.username),
              password: decodeURIComponent(url.password),
              database: database,
              ssl: configService.get<string>('NODE_ENV') === 'production' ? {
                rejectUnauthorized: false, // For Render PostgreSQL
              } : false, // Disable SSL for local development
              synchronize: configService.get<string>('NODE_ENV') !== 'production',
              logging: configService.get<string>('NODE_ENV') === 'development',
              entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
              retryAttempts: 3,
              retryDelay: 3000,
            }
            
            console.log('✅ Using DATABASE_URL connection')
            console.log('   Host:', url.hostname)
            console.log('   Port:', parseInt(url.port) || 5432)
            console.log('   Database:', database)
            console.log('   Username:', url.username)
            
            return dbConfig
          } catch (error: any) {
            console.error('❌ Error parsing DATABASE_URL:', error.message)
            console.error('   URL length:', databaseUrl.length)
            console.error('   URL starts with:', databaseUrl.substring(0, 20))
            console.warn('⚠️ Falling back to individual env vars')
          }
        } else {
          console.warn('⚠️ DATABASE_URL not set or empty, using individual env vars')
        }
        
        // Fallback to individual env vars
        const host = configService.get<string>('DB_HOST', 'localhost')
        const port = configService.get<number>('DB_PORT', 5432)
        const username = configService.get<string>('DB_USERNAME', 'postgres')
        const password = configService.get<string>('DB_PASSWORD', 'postgres')
        const database = configService.get<string>('DB_NAME', 'simulationsai')
        
        const dbConfig = {
          type: 'postgres' as const,
          host: host,
          port: port,
          username: username,
          password: password,
          database: database,
          ssl: configService.get<string>('NODE_ENV') === 'production' ? {
            rejectUnauthorized: false,
          } : false,
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          logging: configService.get<string>('NODE_ENV') === 'development',
          entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
          retryAttempts: 3,
          retryDelay: 3000,
        }
        
        console.log('✅ Using individual DB env vars')
        console.log('   Host:', host)
        console.log('   Port:', port)
        console.log('   Database:', database)
        console.log('   Username:', username)
        
        return dbConfig
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
