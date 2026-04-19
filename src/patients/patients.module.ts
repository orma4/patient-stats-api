import { Module } from '@nestjs/common';
import { PatientsController } from './api/patients.controller';
import { HeartRateReadingsController } from './api/heart-rate-readings.controller';
import { PatientsService } from './application/patients.service';
import { InMemoryPatientRepository } from './infrastructure/repositories/in-memory-patient.repository';
import { InMemoryHeartRateRepository } from './infrastructure/repositories/in-memory-heart-rate.repository';
import { PATIENT_REPOSITORY } from './infrastructure/repositories/patient.repository.interface';
import { HEART_RATE_REPOSITORY } from './infrastructure/repositories/heart-rate.repository.interface';
import { DataSeedService } from './infrastructure/seed/data-seed.service';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [PatientsController, HeartRateReadingsController],
  providers: [
    { provide: PATIENT_REPOSITORY, useClass: InMemoryPatientRepository },
    { provide: HEART_RATE_REPOSITORY, useClass: InMemoryHeartRateRepository },
    { provide: InMemoryPatientRepository, useExisting: PATIENT_REPOSITORY },
    { provide: InMemoryHeartRateRepository, useExisting: HEART_RATE_REPOSITORY },
    PatientsService,
    DataSeedService,
  ],
})
export class PatientsModule {}
