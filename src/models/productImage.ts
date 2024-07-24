import {IProductImage} from '../types/productImage'
import { model, Schema } from 'mongoose'

const productImageSchema: Schema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products', 
            required: true,
        },
        product_image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IProductImage>('ProductImages', productImageSchema);