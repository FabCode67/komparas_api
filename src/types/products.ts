import { Document, Types } from "mongoose";
import { ICategory } from "./category";
import { IShop } from "./shop";

interface IProducts extends Document {
  toObject(): any;
  _id: any;
  save(): Promise<this>;
  product_name: string;
  product_description: string;
  category: Types.ObjectId | ICategory;
  product_image: string;
  product_number: number;
  vendors: Types.ObjectId[] | IShop[];
  product_specifications?: Array<{ key: string; value: string }>;
  vendor_prices: Array<{
    [x: string]: any; vendor_id: Types.ObjectId | IShop; price: number 
}>;
  createdAt?: Date;
  updatedAt?: Date;
  product_price:String;
  product_quantity:String;
  product_category:String;
  our_price:String;
  our_review?:Array<{ key: string; value: string }>;
  availableStorages?:Array<{ value: string }>;
}

export { IProducts };
