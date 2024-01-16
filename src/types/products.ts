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
  vendors: Types.ObjectId[] | IShop[];
  product_specifications?: Array<{ key: string; value: string }>;
  vendor_prices: Array<{ vendor_id: Types.ObjectId | IShop; price: number }>;
  createdAt?: Date;
  updatedAt?: Date;
  product_price:String;
  product_quantity:String;
  product_category:String;
}

export { IProducts };
