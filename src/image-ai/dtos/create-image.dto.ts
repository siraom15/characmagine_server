import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    prompt: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    steps: number;
}
