import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Patient } from '../../domain/patient.entity';
import { HeartRateReading } from '../../domain/heart-rate-reading.entity';
import { InMemoryPatientRepository } from '../repositories/in-memory-patient.repository';
import { InMemoryHeartRateRepository } from '../repositories/in-memory-heart-rate.repository';

interface RawPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

interface RawHeartRateReading {
  patientId: string;
  timestamp: string;
  heartRate: number;
}

interface PatientsJson {
  patients: RawPatient[];
  heartRateReadings: RawHeartRateReading[];
}

@Injectable()
export class DataSeedService implements OnModuleInit {
  constructor(
    private readonly patientRepo: InMemoryPatientRepository,
    private readonly heartRateRepo: InMemoryHeartRateRepository,
  ) {}

  onModuleInit(): void {
    const filePath = path.resolve(process.cwd(), 'patients.json');
    const raw: PatientsJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const patients = raw.patients.map(
      (p) => new Patient(p.id, p.name, p.age, p.gender),
    );

    const readings = raw.heartRateReadings.map(
      (r) => new HeartRateReading(r.patientId, new Date(r.timestamp), r.heartRate),
    );

    this.patientRepo.seed(patients);
    this.heartRateRepo.seed(readings);
  }
}
