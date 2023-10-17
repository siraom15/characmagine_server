import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dtos/create-story';
import { Story } from './schemas/story.schema';
import { UpdateStoryDto } from './dtos/update-story';

@Injectable()
export class StoryService {
    constructor(
        @InjectModel(Story.name)
        private collectionModel: Model<Story>,
    ) {
    }

    async create(userId: string, createStoryDto: CreateStoryDto): Promise<Story> {
        console.log(userId);
        const createdCollection = new this.collectionModel({
            owner: userId,
            ...createStoryDto,
        });
        return createdCollection.save();
    }

    async findAll(): Promise<Story[]> {
        return this.collectionModel.find().exec();
    }

    async findOneById(id: string): Promise<Story> {
        return this.collectionModel.findById(id).exec();
    }

    async findMyStory(userId: string): Promise<Story[]> {
        return this.collectionModel.find({ owner: userId }).exec();
    }

    async update(id: string, updateStoryDto: UpdateStoryDto): Promise<Story> {
        return await this.collectionModel.findOneAndUpdate({ _id: id }, updateStoryDto, { new: true });
    }
}
