import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';
import { Character, CharacterSchema } from './charactor.schema';
@Schema()
export class Collection extends Document {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: process.env.DUMMY_IMG_URL })
  images: string;

  @Prop({ type: [CharacterSchema], default: [] })
  characters: Character[];

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
