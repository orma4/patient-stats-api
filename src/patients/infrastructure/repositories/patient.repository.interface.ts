import { Patient } from '../../domain/patient.entity';

export const PATIENT_REPOSITORY = 'PATIENT_REPOSITORY';

export interface IPatientRepository {
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
}
