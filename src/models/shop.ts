import mongoose, { Schema, Document } from 'mongoose';
import { IShop } from '../types/shop';

const ShopSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    owner: { type: String},
    location: { type: String, required: true },
    location_coordinates: {
        lat: { type: Number },
        lng: { type: Number
        }
    },
    location_discription: { type: String },
    working_hours: [{
        day: { type: String },
        time_range: { type: String }
    }],
    phone: { type: String },
    email: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
}, { timestamps: true });

export default mongoose.model<IShop>('Shop', ShopSchema);