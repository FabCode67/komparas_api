import {ICategories} from '../types/categories' 
import { model, Schema } from 'mongoose'

const categoryShema: Schema = new Schema(
    {
        category_name:{
            type: 'string',
            required: true,
        },
        category_description: {
            type: 'string',
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export default model<ICategories>("Categories", categoryShema)