export interface IPromo3 extends Document {
    save(): IPromo3 | PromiseLike<IPromo3>;
    name:string;
    description:string;
    offer:string;
    price:number;
    image:string;
    product:any
}
