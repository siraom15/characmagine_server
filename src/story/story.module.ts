import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryService } from './story.service';
import { Story, StorySchema } from './schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
  ],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule { }
