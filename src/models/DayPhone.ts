import { Schema, model, Document } from 'mongoose';
import { IDayPhone } from '../types/DayPhone';

const DayPhoneSchema = new Schema<IDayPhone>({
    name: { type: String},
    description: { type: String},
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

const DayPhone = model<IDayPhone>('DayPhone', DayPhoneSchema);

export default DayPhone;