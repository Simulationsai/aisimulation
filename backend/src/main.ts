import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Log environment check
  console.log('🔍 Environment Check:')
  console.log('  NODE_ENV:', process.env.NODE_ENV)
  console.log('  PORT:', process.env.PORT)
  if (process.env.DATABASE_URL) {
    const dbUrlForLog = process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')
    console.log('  DATABASE_URL:', '✅ Set (' + dbUrlForLog.substring(0, 60) + '...)')
  } else {
    console.log('  DATABASE_URL:', '❌ Not set')
  }
  console.log('  FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set')
  
  const app = await NestFactory.create(AppModule);

  // Enable CORS - Allow Vercel origins and localhost
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://frontend-umber-phi-ejhswkr2lv.vercel.app',
    'https://frontend-21n6mof7n-luis-projects-6b93028a.vercel.app',
    /^https:\/\/frontend-.*\.vercel\.app$/, // Allow all Vercel preview deployments
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      const isAllowed = allowedOrigins.some(allowed => {
        if (typeof allowed === 'string') {
          return origin === allowed;
        }
        if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return false;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn('⚠️ CORS blocked origin:', origin);
        callback(null, true); // Allow for now, can restrict later
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Root route handler (before global prefix)
  app.use('/', (req, res, next) => {
    if (req.path === '/') {
        return res.json({
          message: 'SimulationAI API',
          version: '2.0.0',
          status: 'running',
          endpoints: {
            health: '/api/health',
            docs: '/api/docs',
            api: '/api',
          },
          note: 'All API endpoints are prefixed with /api. Rewards are earned as XP, which will later convert to SIMU tokens on Base.',
          rewardUnit: 'XP',
          futureToken: 'SIMU',
          chain: 'Base',
        });
    }
    next();
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('SimulationAI API')
    .setDescription('Decentralized Compute Platform for Simulation Workloads')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces for Render
  console.log(`🚀 SimulationAI API is running on: http://0.0.0.0:${port}`);
  console.log(`📚 API Documentation: http://0.0.0.0:${port}/api/docs`);
}

bootstrap();
