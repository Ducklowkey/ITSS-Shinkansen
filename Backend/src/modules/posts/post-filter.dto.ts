import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterPostDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  search?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  categoryId?: number[];

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  flavor?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  beginPrice?: number[];

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  endPrice?: number[];
}
