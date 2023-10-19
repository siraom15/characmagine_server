import { Module } from '@nestjs/common';
import { ImageAiService } from './image-ai.service';
import { ImageAiController } from './image-ai.controller';

@Module({
  providers: [ImageAiService],
  controllers: [ImageAiController]
})
export class ImageAiModule {}
