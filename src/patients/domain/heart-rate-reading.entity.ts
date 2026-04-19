export class HeartRateReading {
  constructor(
    public readonly patientId: string,
    public readonly timestamp: Date,
    public readonly heartRate: number,
  ) {
    if (heartRate <= 0) {
      throw new Error('Heart rate must be a positive number');
    }
  }
}
