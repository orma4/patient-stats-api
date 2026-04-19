export const TRACKING_REPOSITORY = 'TRACKING_REPOSITORY';

export interface ITrackingRepository {
  increment(patientId: string): Promise<void>;
  getCount(patientId: string): Promise<number>;
}
