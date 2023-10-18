import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dtos/create-story';
import { Story } from './schemas/story.schema';
import { UpdateStoryDto } from './dtos/update-story';
import { CreateCharacterDto } from 'src/character/dtos/create-character';
import { UpdateCharacterDto } from 'src/character/dtos/update-character';

@Injectable()
export class StoryService {
    constructor(
        @InjectModel(Story.name)
        private storyModel: Model<Story>,
    ) {
    }

    async create(userId: string, createStoryDto: CreateStoryDto): Promise<Story> {
        console.log(userId);
        const createdCollection = new this.storyModel({
            owner: userId,
            ...createStoryDto,
        });
        return createdCollection.save();
    }

    async findAll(): Promise<Story[]> {
        return this.storyModel.find().exec();
    }

    async findOneById(id: string): Promise<Story> {
        return this.storyModel.findById(id).exec();
    }

    async findMyStory(userId: string): Promise<Story[]> {
        return this.storyModel.find({ owner: userId }).exec();
    }

    async findAllPublic(): Promise<Story[]> {
        return this.storyModel.find({ isPublic: true }).exec();
    }

    async update(id: string, updateStoryDto: UpdateStoryDto): Promise<Story> {
        return await this.storyModel.findOneAndUpdate({ _id: id }, updateStoryDto, { new: true });
    }

    async addCharacterToStory(id: string, createCharacterDto: CreateCharacterDto): Promise<Story> {
        return await this.storyModel.findOneAndUpdate(
            { _id: id },
            { $push: { characters: createCharacterDto } },
            { new: true });
    }

    async updateCharacterInStory(id: string, characterId: string, updateCharacterDto: UpdateCharacterDto): Promise<Story> {
        return await this.storyModel.findOneAndUpdate(
            { _id: id, 'characters._id': characterId },
            { $set: { 'characters.$': updateCharacterDto } },
            { new: true });
    }

    async deleteCharacterInStory(id: string, characterId: string): Promise<Story> {
        return await this.storyModel.findOneAndUpdate(
            { _id: id },
            { $pull: { characters: { _id: characterId } } },
            { new: true }
        );
    }
}
