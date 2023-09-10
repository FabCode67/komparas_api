// product.model.ts
import { IProducts } from '../types/products';
import { model, Schema } from 'mongoose';

const productSchema: Schema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories', 
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategories', 
      required: true,
    },
    product_image: {
      type: String,
      required: false,
    },
    product_status: {
      type: String,
      default: 'active',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProducts>('Products', productSchema);
