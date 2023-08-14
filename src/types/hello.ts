import { Document } from "mongoose"
export interface IHello extends Document {
  hello: string;
}

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
  status: string;
}  
