import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { UserModule } from 'src/user/user.module';
import { StoryModule } from 'src/story/story.module';

@Module({
  imports : [UserModule, StoryModule ],
  controllers: [StatsController],
  providers: []
})
export class StatsModule {}
