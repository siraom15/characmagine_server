import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStoryDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
