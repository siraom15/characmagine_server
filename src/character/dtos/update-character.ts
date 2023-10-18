import { PartialType } from "@nestjs/swagger";
import { CreateCharacterDto } from "./create-character";

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {

}