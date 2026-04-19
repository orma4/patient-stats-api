export interface ElevatedReadingResponse {
  patientId: string;
  patientName: string;
  heartRate: number;
  timestamp: Date;
}

export interface HeartRateAnalyticsResponse {
  patientId: string;
  patientName: string;
  from: Date;
  to: Date;
  average: number | null;
  min: number | null;
  max: number | null;
  readingCount: number;
}
