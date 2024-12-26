import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
 

  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsNumber()
  @ApiProperty({ required: false })
  price: number;

  @IsNumber()
  @ApiProperty({ required: false })
  voteRate: number;

  @IsNumber()
  @ApiProperty({ required:true})
  categoryId: number;

  @IsString()
  @ApiProperty({ required: true })
  materials: string;

  @IsString()
  @ApiProperty({ required: false })
  making  : string;

  @IsString()
  @ApiProperty({ required: false })
  image   : string;
}
