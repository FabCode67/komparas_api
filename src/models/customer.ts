import { Schema, model, Document } from 'mongoose';
import { ICustomer } from '../types/customers';

const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true},
    age: { type: String, required: true},
}, { timestamps: true });

const Customer = model<ICustomer>('Customer', CustomerSchema);
export default Customer;