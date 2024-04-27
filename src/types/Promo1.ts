export interface IPromo1 extends Document {
    save(): IPromo1 | PromiseLike<IPromo1>;
    name:string;
    description:string;
    offer:string;
    price:number;
    image:string;
}
