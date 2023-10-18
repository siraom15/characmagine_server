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
    Param,
    HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-story';
import { UpdateStoryDto } from './dtos/update-story';
import { Public } from 'src/auth/decorator/public.decorator';
import { Story } from './schemas/story.schema';
import { CreateCharacterDto } from 'src/character/dtos/create-character';
import { UpdateCharacterDto } from 'src/character/dtos/update-character';

@ApiTags('story')
@Controller('api/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateStoryDto, @Req() req) {
        const userId = req.user.id;
        return this.storyService.create(userId, dto);
    }

    @Get('/public')
    @Public()
    async findAllPublic() {
        return this.storyService.findAllPublic();
    }

    @Get('/id/:id')
    @Public()
    async findOneById(@Req() req, @Param('id') storyId: string) {
        const userId = req.user?.id || null;
        const stories = await this.storyService.findOneById(storyId);
        this.checkReadAccess(stories, userId);
        return stories;
    }

    @Get('/mystory')
    async findMyStory(@Req() req) {
        const userId = req.user.id;
        return this.storyService.findMyStory(userId);
    }

    @Patch('/id/:id')
    async update(@Req() req, @Body() dto: UpdateStoryDto, @Param('id') storyId: string) {
        const stories = await this.storyService.findOneById(storyId);
        this.checkUpdateAccess(stories, req.user.id);
        return this.storyService.update(req.params.id, dto);
    }

    @Post(':storyId/characters')
    async addCharacterToStory(
        @Param('storyId') storyId: string,
        @Body() createCharacterDto: CreateCharacterDto
    ) {
        return this.storyService.addCharacterToStory(storyId, createCharacterDto);
    }

    @Put(':storyId/characters/:characterId')
    async updateCharacterInStory(
        @Param('storyId') storyId: string,
        @Param('characterId') characterId: string,
        @Body() updateCharacterDto: UpdateCharacterDto,
    ) {
        return this.storyService.updateCharacterInStory(storyId, characterId, updateCharacterDto);
    }

    private checkReadAccess(stories: Story, userId: string | null) {
        if (!stories.isPublic && stories.owner._id.toString() !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    private checkUpdateAccess(stories: Story, userId: string) {
        if (stories.owner._id.toString() !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}
