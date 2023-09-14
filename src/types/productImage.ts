import { Types } from "mongoose";
import {IProducts} from "./products";

export interface IProductImage extends Document {
    _id : any;
    save(): IProductImage | PromiseLike<IProductImage>
    product_name: Types.ObjectId | IProducts;
    product_id: Types.ObjectId | IProducts;
    product_image: string;
}