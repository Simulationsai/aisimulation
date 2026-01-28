import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'SimulationAI API',
      version: '2.0.0',
    };
  }

  ready() {
    // TODO: Check database connection, Redis, etc.
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  live() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }
}
