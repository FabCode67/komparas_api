import { IProducts } from '../types/products';
import { model, Schema } from 'mongoose';

const productShema: Schema = new Schema(
    {
        product_name: {
            type: 'string',
            required: true,
        },
        product_description: {
            type: 'string',
            required: true,
        },
        product_price: {
            type: 'number',
            required: true,
        },
        product_quantity: {
            type: 'number',
            required: true,
        },
        category_name: {
            type: String,
            ref: 'Categories', 
          },
        product_image: {
            type: 'string',
            required: false,
        },
        product_status: {
            type: 'string',
            default: 'active',
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export default model<IProducts>("Products", productShema)
