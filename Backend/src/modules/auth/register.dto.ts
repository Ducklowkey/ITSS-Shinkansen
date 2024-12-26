import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'tester' })
    name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
    password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'test@gmail.com' })
    email: string;
}
