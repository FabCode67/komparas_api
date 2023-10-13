import mongoose, { Schema, Document } from 'mongoose';
import { IShop } from '../types/shop';

const ShopSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    contactInfo: { type: String },
    workingHours: { type: String },
}, { timestamps: true });

export default mongoose.model<IShop>('Shop', ShopSchema);