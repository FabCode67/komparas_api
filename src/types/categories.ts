export interface ICategories extends Document {
    _id: any;
    save(): ICategories | PromiseLike<ICategories>;
    category_name: string;
    category_description: string;
}