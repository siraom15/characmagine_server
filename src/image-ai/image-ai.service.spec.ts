import { Test, TestingModule } from '@nestjs/testing';
import { ImageAiService } from './image-ai.service';

describe('ImageAiService', () => {
  let service: ImageAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageAiService],
    }).compile();

    service = module.get<ImageAiService>(ImageAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
