import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean, IsEmail,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'tester' })
    name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
    password: string;

  // @IsString()
  @IsEmail({}, { message: 'EMAIL_IS_INVALID' })
  @IsOptional()
  @ApiProperty({ example: 'test@gmail.com' })
    email: string;

}
