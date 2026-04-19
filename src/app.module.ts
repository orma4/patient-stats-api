import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [PatientsModule, TrackingModule],
})
export class AppModule {}
