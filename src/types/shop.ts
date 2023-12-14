import { Document } from 'mongoose';

export interface IShop extends Document {
    name: string;
    location: string;
    working_hours?: string;
    phone?: string;
    email?: string;
    description?: string;
}

