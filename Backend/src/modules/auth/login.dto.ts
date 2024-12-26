import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, MinLength, IsNumber,
  IsEmail,
} from 'class-validator';

export class LoginDto {

  @IsString()
  @IsEmail()
  @ApiProperty()
    email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
    password: string;
}
