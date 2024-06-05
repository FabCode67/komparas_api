export interface IDayPhone extends Document {
    product_image: any;
    save(): IDayPhone | PromiseLike<IDayPhone>;
    name:string;
    description:string;
    offer:string;
    price:number;
    image:string;
    product:any
}
