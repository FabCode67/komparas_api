import { Response, Request } from "express";
import { IUSer } from "../../types/hello";
import Users from "../../models/Users/users";
import { isValidEmail } from "../../middleware/emailValidity";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUSer[] = await Users.find().maxTimeMS(30000); 
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
    }

    export const addUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body as Pick<IUSer, "first_name" | "last_name" | "email" | "password" | "confirm_password" | "role" | "status">
    
            if (!body.first_name || !body.last_name || !body.email || !body.password || !body.confirm_password || !body.role || !body.status) {
                res.status(401).json({
                    status: false,
                    message: "Please fill all fields"
                });
                return;
            }
    
            if (body.password !== body.confirm_password) {
                res.status(401).json({
                    status: false,
                    message: "Password does not match"
                });
                return;
            }
    
            if (body.password.length < 6) {
                res.status(401).json({
                    status: false,
                    message: "Password must be at least 6 characters"
                });
                return;
            }
    
            if (!isValidEmail(body.email)) {
                res.status(401).json({
                    status: false,
                    message: "Invalid email address"
                });
                return;
            }
    
            // Check if email is already registered
            const existingUser = await Users.findOne({ email: body.email });
            if (existingUser) {
                res.status(409).json({
                    status: false,
                    message: "Email already registered"
                });
                return;
            }
    
            const newUser: IUSer = new Users({
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: body.password,
                confirm_password: body.confirm_password,
                role: body.role,
                status: body.status
            });
    
            const newUsers: IUSer = await newUser.save();
            const allUsers: IUSer[] = await Users.find();
    
            res
                .status(201)
                .json({ message: "User added", user: newUsers, users: allUsers });
        } catch (error) {
            throw error;
        }
    };
    

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            params: { id },
            body,
        } = req
        const updateUsers: IUSer | null = await Users.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allUsers: IUSer[] = await Users.find()
        res.status(200).json({
            message: "Users updated",
            users: updateUsers,
            userss: allUsers,
        })
    } catch (error) {
        res.status(500).json({ message: "Error updating Users" })
        }
}


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const deletedUsers: IUSer | null = await Users.findByIdAndRemove(
            req.params.id
        )
        const allUsers: IUSer[] = await Users.find()
        res.status(200).json({
            message: "Users deleted",
            users: deletedUsers,
            userss: allUsers,
        })
    } catch (error) {
        res.status(500).json({ message: "Error deleting Users" })
        }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUSer | null = await Users.findById(req.params.id)
        res.status(200).json({
            message: "Success",
            user: user,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving User" })
        }
}

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUSer | null = await Users.findOne({email: req.params.email})
        res.status(200).json({
            message: "Success",
            user: user,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving User" })
        }
}

