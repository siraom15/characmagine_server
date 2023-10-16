import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dtos/create-image.dto';
import axios from 'axios';


@Injectable()
export class ImageAiService {
    async getImageBase64(createImageDto: CreateImageDto): Promise<string> {
        const url = process.env.AI_API_BASE_URL;

        if (!createImageDto.prompt) {
            return null;
        }

        const payload = JSON.stringify({
            prompt: createImageDto.prompt,
            steps: createImageDto.steps ?? 50,
        });

        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.AI_API_KEY,
        };
        try {
            const response = await axios.post(url, payload, { headers });
            const base64String = response.data.images[0];
            return base64String;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
}
