export interface ICustomer extends Document {
    save(): ICustomer | PromiseLike<ICustomer>;
    name: string;
    age: string
}
