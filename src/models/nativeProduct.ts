import {Schema, model, Document} from 'mongoose';
import { INativeProducts } from '../types/nativeProducts';

const nativeProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: false
        },
        quantity: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        our_review: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
)

export default model<INativeProducts>("NativeProducts", nativeProductSchema)