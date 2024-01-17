import { Document } from "mongoose"
export interface INativeProducts extends Document {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  location: string;
  image: string;
}  
