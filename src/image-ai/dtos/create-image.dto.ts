import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
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
    @Max(1000)
    @Min(0)
    steps: number;
}
