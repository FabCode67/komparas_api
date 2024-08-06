import { Document } from 'mongoose';

export interface IShop extends Document {
    name: string;
    owner: string;
    location: string;
    working_hours?: any;
    phone?: string;
    email?: string;
    description?: string;
    colors:any,
    image: string;
    location_discription: string;
    shop_number: number;
}

