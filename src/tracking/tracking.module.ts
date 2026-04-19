import { Module } from '@nestjs/common';
import { TrackingService } from './application/tracking.service';
import { InMemoryTrackingRepository } from './infrastructure/in-memory-tracking.repository';
import { TRACKING_REPOSITORY } from './infrastructure/tracking.repository.interface';
import { RequestTrackingInterceptor } from './interceptors/request-tracking.interceptor';

@Module({
  providers: [
    { provide: TRACKING_REPOSITORY, useClass: InMemoryTrackingRepository },
    TrackingService,
    RequestTrackingInterceptor,
  ],
  exports: [TrackingService, RequestTrackingInterceptor],
})
export class TrackingModule {}
