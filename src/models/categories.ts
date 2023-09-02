import {ICategories} from '../types/categories' 
import { model, Schema } from 'mongoose'

const categorySchema: Schema = new Schema(
    {
      category_name: {
        type: String,
        required: true,
      },
      category_description: {
        type: String,
        required: true,
      },
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  

export default model<ICategories>("Categories", categorySchema)