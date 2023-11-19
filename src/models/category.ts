import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../types/category';

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
}, { timestamps: true });

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
