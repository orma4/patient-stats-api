import { Injectable } from '@nestjs/common';
import { HeartRateReading } from '../../domain/heart-rate-reading.entity';
import { HeartRateAnalyticsCalculator } from '../../domain/heart-rate-analytics.calculator';
import { IHeartRateRepository } from './heart-rate.repository.interface';

@Injectable()
export class InMemoryHeartRateRepository implements IHeartRateRepository {
  private readings: HeartRateReading[] = [];

  seed(readings: HeartRateReading[]): void {
    this.readings = readings;
  }

  async findAll(): Promise<HeartRateReading[]> {
    return [...this.readings];
  }

  async findElevated(): Promise<HeartRateReading[]> {
    return this.readings.filter((r) => r.heartRate > HeartRateAnalyticsCalculator.ELEVATED_THRESHOLD);
  }

  async findByPatientIdInRange(
    patientId: string,
    from: Date,
    to: Date,
  ): Promise<HeartRateReading[]> {
    return this.readings.filter(
      (r) =>
        r.patientId === patientId &&
        r.timestamp >= from &&
        r.timestamp <= to,
    );
  }
}
