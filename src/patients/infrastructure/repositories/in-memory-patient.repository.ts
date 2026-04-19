import { Injectable } from '@nestjs/common';
import { Patient } from '../../domain/patient.entity';
import { IPatientRepository } from './patient.repository.interface';

@Injectable()
export class InMemoryPatientRepository implements IPatientRepository {
  private patients: Patient[] = [];

  seed(patients: Patient[]): void {
    this.patients = patients;
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patients.find((p) => p.id === id) ?? null;
  }

  async findAll(): Promise<Patient[]> {
    return [...this.patients];
  }
}
