export interface IProducts extends Document {
    save(): IProducts | PromiseLike<IProducts>;
    product_name: string;
    product_description: string;
    product_price: number;
    product_quantity: number;
    product_category: string;
    product_image: string;
    product_status: string;
}