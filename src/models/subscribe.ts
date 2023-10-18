import { Schema, model, Document } from 'mongoose';
import {ISubscribe} from '../types/subscribe';

const SubsSchema = new Schema<ISubscribe>({
    email: { type: String, required: true },
    confirmed: {type: Boolean, required: true, default: false},
    token: {type: String, required: true}
}, { timestamps: true });

const Subs = model<ISubscribe>('Subs', SubsSchema);

export default Subs;