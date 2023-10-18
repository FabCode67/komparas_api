import { Document } from 'mongoose';

export interface ISubscribe extends Document {
    email: string;
    confirmed: boolean;
    token: string
}
