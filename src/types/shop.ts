import { Document } from 'mongoose';

export interface IShop extends Document {
    name: string;
    vendor_id: number;
    location: string;
    contactInfo?: string;
    workingHours?: string;
    map:any
}

