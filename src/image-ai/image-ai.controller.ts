import { Body, Controller, Get, Post } from '@nestjs/common';
import { ImageAiService } from './image-ai.service';
import { CreateImageDto } from './dtos/create-image.dto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('api/generate')
@Public()
export class ImageAiController {
    constructor(
        private readonly imageAiService: ImageAiService,
    ) { }

    @Post('/character')
    async generateCharacter(@Body() createImageDto: CreateImageDto) {
        let image = await this.imageAiService.generateCharacter(createImageDto);
        return { image };
    }
}
