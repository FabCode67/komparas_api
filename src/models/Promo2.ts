import { Schema, model, Document } from 'mongoose';
import { IPromo2 } from '../types/Promo2';

const Promo2Schema = new Schema<IPromo2>({
    name: { type: String},
    description: { type: String},
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

const Promo2 = model<IPromo2>('Promo2', Promo2Schema);

export default Promo2;