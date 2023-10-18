import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { StoryService } from 'src/story/story.service';
import { UserService } from 'src/user/user.service';

@Controller('api/stats')
@Public()
export class StatsController {
    constructor(
        private readonly storyService: StoryService,
        private readonly userService: UserService,
    ) { }

    @Get()
    async stats() {
        return {
            storyCount: await this.storyService.storyCount(),
            characterCount: await this.storyService.characterCount(),
            userCount: await this.userService.userCount(),
            publicStoryCount: await this.storyService.publicStoryCount(),
        };
    }

    @Get('/story-count')
    async storyCount() {
        return this.storyService.storyCount();
    }

    @Get('/character-count')
    async characterCount() {
        return this.storyService.characterCount();
    }

    @Get('/user-count')
    async userCount() {
        return this.userService.userCount();
    }


}
