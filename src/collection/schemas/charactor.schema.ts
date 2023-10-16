import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';
@Schema()
export class Character extends Document {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: process.env.DUMMY_IMG_URL })
  images: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
