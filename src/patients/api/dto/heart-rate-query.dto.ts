import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class HeartRateQueryDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  from: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  to: Date;
}
