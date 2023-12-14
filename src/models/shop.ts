import mongoose, { Schema, Document } from 'mongoose';
import { IShop } from '../types/shop';

const ShopSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    working_hours: { type: String },
    phone: { type: String },
    email: { type: String, unique: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model<IShop>('Shop', ShopSchema);