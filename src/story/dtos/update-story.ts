// create uodate collectionDto

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateCharactorDto } from "./create-charactor";
import { CreateStoryDto } from "./create-story";

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty()
    @IsOptional()
    @Type(() => CreateCharactorDto)
    @ValidateNested()
    characters: CreateCharactorDto[];
}
