import { Document } from "mongoose"

export interface IHello extends Document {
  hello: string;
}