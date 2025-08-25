import mongoose, { Schema, Document, Types } from 'mongoose';
import argon2 from 'argon2';
import { IFood } from './types';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  favorites: (Types.ObjectId | IFood)[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  } catch (err) {
    const error = err as Error;
    return next(error);
  }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
