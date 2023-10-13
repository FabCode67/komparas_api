import { Types } from "mongoose";
import { ICategory } from "./category";
import { IShop } from "./shop";

export interface IProducts extends Document {
    toObject(): any;
    _id: any;
    save(): IProducts | PromiseLike<IProducts>;
    product_name: string;
    product_description: string;
    product_price: number;
    category: Types.ObjectId | ICategory;
    vendor:Types.ObjectId | IShop;
    product_image: string;
}