import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
 

  @IsNumber()
  @ApiProperty({ required: true })
  userId: number;

  @IsString()
  @ApiProperty({ required: true })
  userName: string;

  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @IsNumber()
  @ApiProperty({ required: true })
  postId: number;
}
