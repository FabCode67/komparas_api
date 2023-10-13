import { Schema, model, Document } from 'mongoose';
import {ISubscribe} from '../types/subscribe';

const CategorySchema = new Schema<ISubscribe>({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Category = model<ISubscribe>('Subs', CategorySchema);

export default Category;