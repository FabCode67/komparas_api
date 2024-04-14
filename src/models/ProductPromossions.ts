import {IProductPromossions } from '../types/promossions'
import { model, Schema } from 'mongoose'

const productPromossionSchema: Schema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products', 
            required: true,
        },
        product_promossion: {
            type: Date
        },
    },
    {
        timestamps: true,
    }
);



export default model<IProductPromossions>('ProductPromossions', productPromossionSchema);