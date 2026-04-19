import { Injectable } from '@nestjs/common';
import { ITrackingRepository } from './tracking.repository.interface';

@Injectable()
export class InMemoryTrackingRepository implements ITrackingRepository {
  private readonly counts = new Map<string, number>();

  async increment(patientId: string): Promise<void> {
    this.counts.set(patientId, (this.counts.get(patientId) ?? 0) + 1);
  }

  async getCount(patientId: string): Promise<number> {
    return this.counts.get(patientId) ?? 0;
  }
}
