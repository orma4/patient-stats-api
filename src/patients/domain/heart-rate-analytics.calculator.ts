import { HeartRateReading } from './heart-rate-reading.entity';

export interface HeartRateStats {
  average: number | null;
  min: number | null;
  max: number | null;
  readingCount: number;
}

export class HeartRateAnalyticsCalculator {
  static readonly ELEVATED_THRESHOLD = 100;

  static calculateStats(readings: HeartRateReading[]): HeartRateStats {
    if (readings.length === 0) {
      return { average: null, min: null, max: null, readingCount: 0 };
    }

    const rates = readings.map((r) => r.heartRate);
    const sum = rates.reduce((acc, val) => acc + val, 0);

    return {
      average: Math.round((sum / rates.length) * 100) / 100,
      min: Math.min(...rates),
      max: Math.max(...rates),
      readingCount: readings.length,
    };
  }
}
