import { Schema, model, Document } from 'mongoose';
import { IProducts } from '../types/products';

const productSchema = new Schema<IProducts>({
    product_name: {
      type: String,
    },
    product_description: {
      type: String,
    },
    product_price: {
      type: String,
    },
    product_quantity: {
      type: String,
    },
    product_category: {
      type: String,
    },
    product_image: {
      type: String,
    },
    vendors: [{
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    }],
    
    product_specifications: [{
      key: {
        type: String,

      },
      value: {
        type: String,

      },
    }],
    vendor_prices: [{
      vendor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',

      },
      price: {
        type: Number,

      },
    }],
  }, {
    timestamps: true,
  });
  
  export default model<IProducts>('Products', productSchema);