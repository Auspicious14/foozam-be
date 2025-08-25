import { Document } from 'mongoose';

export interface IFood extends Document {
  dish: string;
  recipe: string;
  tags: string[];
  imageUrl: string;
}
