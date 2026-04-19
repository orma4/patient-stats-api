import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TrackingService } from '../application/tracking.service';

@Injectable()
export class RequestTrackingInterceptor implements NestInterceptor {
  constructor(private readonly trackingService: TrackingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const patientId: string | undefined = request.params?.id;

    return next.handle().pipe(
      tap(() => {
        if (patientId) {
          void this.trackingService.increment(patientId);
        }
      }),
    );
  }
}
