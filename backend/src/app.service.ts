import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SimulationAI API v2.0 - Decentralized Compute Platform for Simulation Workloads';
  }
}
