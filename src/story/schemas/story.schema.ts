import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';
import { Character, CharacterSchema } from './charactor.schema';

@Schema()
export class Story extends Document {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  owner: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: process.env.DUMMY_IMG_URL ||'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' })
  image: string;

  @Prop({ type: [CharacterSchema], default: [] })
  characters: Character[];

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const StorySchema = SchemaFactory.createForClass(Story);
