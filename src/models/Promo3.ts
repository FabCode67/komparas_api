import { Schema, model, Document } from 'mongoose';
import { IPromo3 } from '../types/Promo3';

const Promo3Schema = new Schema<IPromo3>({
    name: { type: String},
    description: { type: String},
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

const Promo3 = model<IPromo3>('Promo3', Promo3Schema);

export default Promo3;