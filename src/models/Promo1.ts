import { Schema, model, Document } from 'mongoose';
import { IPromo1 } from '../types/Promo1';

const Promo1Schema = new Schema<IPromo1>({
    name: { type: String},
    description: { type: String},
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

const Promo1 = model<IPromo1>('Promo1', Promo1Schema);

export default Promo1;