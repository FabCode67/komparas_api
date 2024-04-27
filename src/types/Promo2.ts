export interface IPromo2 extends Document {
    save(): IPromo2 | PromiseLike<IPromo2>;
    name:string;
    description:string;
    offer:string;
    price:number;
    image:string;
}
