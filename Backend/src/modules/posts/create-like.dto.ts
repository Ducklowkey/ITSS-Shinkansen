import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLikeDto {
 

  @IsNumber()
  @ApiProperty({ required: true })
  userId: number;

  @IsNumber()
  @ApiProperty({ required: true })
  postId: number;
}
