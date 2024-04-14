import { Date, Types } from "mongoose";
import {IProducts} from "./products";

export interface IProductPromossions extends Document {
    _id : any;
    save(): IProductPromossions | PromiseLike<IProductPromossions>
    product_name: Types.ObjectId | IProducts;
    product_id: Types.ObjectId | IProducts;
    //add promosions in date 
    product_promossion: Date
}