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
    product_price: {
        type: Number,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref:'Shop',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
}, {
    timestamps: true,
});

export default model<IProducts>('Products', productSchema);
