import { IUser } from "../types/users";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        confirm_password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            defaultValue: "buyer",
            required: false
        },
        status: {
            type: String,
            defaultValue: "enabled",
            required: false,
        },
        profile_picture: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
)

export default model<IUser>("Users", userSchema)
