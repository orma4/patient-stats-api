import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { PatientsService } from '../application/patients.service';
import { TrackingService } from '../../tracking/application/tracking.service';
import { RequestTrackingInterceptor } from '../../tracking/interceptors/request-tracking.interceptor';
import { HeartRateQueryDto } from './dto/heart-rate-query.dto';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly trackingService: TrackingService,
  ) {}

  @Get(':id/heart-rate/analytics')
  @UseInterceptors(RequestTrackingInterceptor)
  async getAnalytics(
    @Param('id') id: string,
    @Query() query: HeartRateQueryDto,
  ) {
    return this.patientsService.getAnalytics(id, query.from, query.to);
  }

  @Get(':id/request-count')
  async getRequestCount(@Param('id') id: string) {
    await this.patientsService.findPatientOrFail(id);
    const requestCount = await this.trackingService.getCount(id);
    return { patientId: id, requestCount };
  }
}
