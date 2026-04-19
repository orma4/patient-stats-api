import { Inject, Injectable } from '@nestjs/common';
import {
  ITrackingRepository,
  TRACKING_REPOSITORY,
} from '../infrastructure/tracking.repository.interface';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(TRACKING_REPOSITORY)
    private readonly trackingRepo: ITrackingRepository,
  ) {}

  async increment(patientId: string): Promise<void> {
    await this.trackingRepo.increment(patientId);
  }

  async getCount(patientId: string): Promise<number> {
    return this.trackingRepo.getCount(patientId);
  }
}
