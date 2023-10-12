import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../types/category';
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
    product_quantity: {
        type: Number,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    product_vendor: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
    product_status: {
        type: String,
        default: 'active',
        required: true,
    },
}, {
    timestamps: true,
});

export default model<IProducts>('Products', productSchema);
