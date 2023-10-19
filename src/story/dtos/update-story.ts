// create uodate collectionDto

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateStoryDto } from "./create-story";
import { CreateCharacterDto } from "../character/dtos/create-character";

export class UpdateStoryDto extends PartialType(CreateStoryDto) {
    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty()
    @IsOptional()
    @Type(() => CreateCharacterDto)
    @ValidateNested()
    characters: CreateCharacterDto[];
}
