import mongoose, { Schema } from 'mongoose';
import { IFood } from './types';

const FoodSchema = new Schema<IFood>({
  dish: { type: String, required: true, unique: true },
  recipe: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: {type: String, required: true},
});

export default mongoose.models.Food || mongoose.model<IFood>('Food', FoodSchema);