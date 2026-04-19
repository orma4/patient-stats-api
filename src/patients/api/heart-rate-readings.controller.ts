import { Controller, Get } from '@nestjs/common';
import { PatientsService } from '../application/patients.service';

@Controller('heart-rate-readings')
export class HeartRateReadingsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('elevated')
  async getElevated() {
    return this.patientsService.getElevatedReadings();
  }
}
