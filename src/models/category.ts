import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../types/category';


const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true},
    parent_id: { type: String, default: null },
});

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
