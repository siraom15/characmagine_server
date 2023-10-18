import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schemas/character.schema';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel(Character.name)
        private characterModel: Model<Character>,
    ) {}

    async create(character: Character): Promise<Character> {
        const createdCharacter = new this.characterModel(character);
        return createdCharacter.save();
    }

    async findAll(): Promise<Character[]> {
        return this.characterModel.find().exec();
    }

    async findOne(id: string): Promise<Character> {
        return this.characterModel.findById(id).exec();
    }

    async update(id: string, character: Character): Promise<Character> {
        return this.characterModel.findByIdAndUpdate(id, character, { new: true }).exec();
    }

    async remove(id: string): Promise<Character> {
        return this.characterModel.findByIdAndRemove(id).exec();
    }
}
