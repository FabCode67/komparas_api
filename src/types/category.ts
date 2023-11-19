import { Document } from 'mongoose';

export interface ICategory extends Document {
    category_id: number;
    name: string;
    parent_id: number | null;
    children?: ICategory[] | Array<Document<any, any, ICategory>>; // Updated this line
}
