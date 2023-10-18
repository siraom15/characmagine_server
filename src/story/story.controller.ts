import {
    Controller,
    Get,
    Post,
    HttpCode,
    Body,
    HttpStatus,
    Req,
    Patch,
    Put,
    HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-story';
import { UpdateStoryDto } from './dtos/update-story';
import { Public } from 'src/auth/decorator/public.decorator';

@ApiTags('story')
@Controller('api/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateStoryDto, @Req() req) {
        return await this.storyService.create(req.user.id, dto);
    }

    // Get public story
    @Get('/public')
    @Public()
    async findAllPublic() {
        return await this.storyService.findAllPublic();
    }

    @Get('/id/:id')
    async findOneById(@Req() req) {
        let stories = await this.storyService.findOneById(req.params.id);

        if (!stories.isPublic && stories.owner._id != req.user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        return stories;
    }

    @Get('/mystory')
    async findMyStory(@Req() req) {
        return await this.storyService.findMyStory(req.user.id);
    }

    @Patch('/id/:id')
    async update(@Req() req, @Body() dto: UpdateStoryDto) {
        let stories = await this.storyService.findOneById(req.params.id);

        if (stories.owner._id != req.user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return await this.storyService.update(req.params.id, dto);
    }
}
