import { HeartRateReading } from '../../domain/heart-rate-reading.entity';

export const HEART_RATE_REPOSITORY = 'HEART_RATE_REPOSITORY';

export interface IHeartRateRepository {
  findAll(): Promise<HeartRateReading[]>;
  findElevated(): Promise<HeartRateReading[]>;
  findByPatientIdInRange(
    patientId: string,
    from: Date,
    to: Date,
  ): Promise<HeartRateReading[]>;
}
