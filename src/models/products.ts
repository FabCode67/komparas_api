import { Schema, model, Document } from 'mongoose';
import { IProducts } from '../types/products';

const productSchema = new Schema<IProducts>({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_number: {
    type: Number,
  },
  product_image: {
    type: String,
    required: true,
  },
  vendors: [{
    type: Schema.Types.ObjectId,
    ref: 'Shop',
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  product_specifications: [{
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  our_review: [{
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  }],
  availableStorages: [{
    value: {
      type: String,
    },
  }],
  
  vendor_prices: [{
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    vendor_name: {
      type: String,
      ref: 'Shop',
    },
    price: {
      type: Number,
      required: true,
    },
    colors: [{
      type: String,
      required: true,
    }],
  }],
  our_price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default model<IProducts>('Products', productSchema);