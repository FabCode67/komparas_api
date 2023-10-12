import { Types } from "mongoose";
import { ICategory } from "./category";

export interface IProducts extends Document {
    toObject(): any;
    _id: any;
    save(): IProducts | PromiseLike<IProducts>;
    product_name: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    category: Types.ObjectId | ICategory;
    product_image: string;
    product_vendor: string,
    product_status: string;
}