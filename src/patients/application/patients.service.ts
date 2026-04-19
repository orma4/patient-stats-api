import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  HEART_RATE_REPOSITORY,
  IHeartRateRepository,
} from '../infrastructure/repositories/heart-rate.repository.interface';
import {
  IPatientRepository,
  PATIENT_REPOSITORY,
} from '../infrastructure/repositories/patient.repository.interface';
import { HeartRateAnalyticsCalculator } from '../domain/heart-rate-analytics.calculator';
import { Patient } from '../domain/patient.entity';
import {
  ElevatedReadingResponse,
  HeartRateAnalyticsResponse,
} from './patients.types';

@Injectable()
export class PatientsService {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepo: IPatientRepository,
    @Inject(HEART_RATE_REPOSITORY)
    private readonly heartRateRepo: IHeartRateRepository,
  ) {}

  async getElevatedReadings(): Promise<ElevatedReadingResponse[]> {
    const [patients, elevated] = await Promise.all([
      this.patientRepo.findAll(),
      this.heartRateRepo.findElevated(),
    ]);

    const patientMap = new Map(patients.map((p) => [p.id, p.name]));

    return elevated.map((r) => ({
      patientId: r.patientId,
      patientName: patientMap.get(r.patientId) ?? 'Unknown',
      heartRate: r.heartRate,
      timestamp: r.timestamp,
    }));
  }

  async getAnalytics(
    patientId: string,
    from: Date,
    to: Date,
  ): Promise<HeartRateAnalyticsResponse> {
    if (from >= to) {
      throw new BadRequestException('"from" must be before "to"');
    }

    const patient = await this.findPatientOrFail(patientId);
    const readings = await this.heartRateRepo.findByPatientIdInRange(
      patientId,
      from,
      to,
    );
    const stats = HeartRateAnalyticsCalculator.calculateStats(readings);

    return {
      patientId: patient.id,
      patientName: patient.name,
      from,
      to,
      ...stats,
    };
  }

  async findPatientOrFail(patientId: string): Promise<Patient> {
    const patient = await this.patientRepo.findById(patientId);
    if (!patient) {
      throw new NotFoundException(`Patient with id "${patientId}" not found`);
    }
    return patient;
  }
}
