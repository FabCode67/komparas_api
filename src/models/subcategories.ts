import { ISubcategory } from '../types/subcategory';
import { model, Schema } from 'mongoose';

const subcategorySchema: Schema = new Schema(
  {
    subcategory_name: {
      type: String,
      required: true,
    },
    subcategory_description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories', 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISubcategory>('Subcategories', subcategorySchema);
