import { Types } from "mongoose";
import { ICategories } from "./categories";

export interface ISubcategory extends Document {
    _id : any;
    save(): ISubcategory | PromiseLike<ISubcategory>
    subcategory_name: string;
    category_name: Types.ObjectId | ICategories;
    subcategory_description: string;
}

