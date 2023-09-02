export interface ICategories extends Document {
    save(): ICategories | PromiseLike<ICategories>;
    category_name: string;
    category_description: string;
}