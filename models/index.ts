import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation {
  name: string;
  city: string;
}

export interface IFood extends Document {
  dish: string;
  recipe: string;
  tags: string[];
  imageUrl: string
  locations: ILocation[];
}

const LocationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  city: { type: String, required: true },
});

const FoodSchema = new Schema<IFood>({
  dish: { type: String, required: true, unique: true },
  recipe: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: {type: String, required: true},
  locations: [LocationSchema],
});

export default mongoose.models.Food || mongoose.model<IFood>('Food', FoodSchema);