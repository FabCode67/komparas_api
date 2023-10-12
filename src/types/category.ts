export interface ICategory extends Document {
    isNew: any;
    category_id: number;
    name: string;
    parent_id: number | null; 
}
