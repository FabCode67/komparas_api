import { Response, Request } from "express";
import { IUser } from "../../types/users";
import Users from "../../models/users";
import { isValidEmail } from "../../middleware/emailValidity";
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import bcrypt from 'bcrypt';

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req.body;
        const imageFile = req.file;

        if (!first_name || !last_name || !email || !password || !confirm_password ) {
            res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({
                status: false,
                message: "Invalid email address",
            });
            return;
        }

        if (password !== confirm_password) {
            res.status(400).json({
                status: false,
                message: "Passwords do not match",
            });
            return;
        }

        if(password.length < 8) {
            res.status(400).json({
                status: false,
                message: "Password must be at least 8 characters long",
            });
            return;
        }
        const existingUser: IUser | null = await Users.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({
                status: false,
                message: "User with this email already exists",
            });
            return;
        }

        

        if (imageFile) {
            const result: UploadStream = cloudinaryV2.uploader.upload_stream(
                { folder: 'product-image' },
                async (error, cloudinaryResult: any) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                            status: false,
                            message: 'An error occurred while uploading the image to Cloudinary',
                        });
                    } else {
                        const hashedPassword = await bcrypt.hash(password, 10);

                        const newUser: IUser = new Users({
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            password: hashedPassword,
                            confirm_password: confirm_password,
                            role: 'buyer',
                            status: "enabled",
                            profile_picture: cloudinaryResult.secure_url as string,
                        });

                        const savedUser: IUser = await newUser.save();
                        res.status(201).json({
                            message: 'User added successfully',
                            user: savedUser,
                        });
                    }
                }
            );

            if (!result) {
                throw new Error("Cloudinary upload failed");
            }

            streamifier.createReadStream(imageFile.buffer).pipe(result);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: IUser = new Users({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                confirm_password: confirm_password,
                role: 'buyer',
                status: "enabled",
            });
            const savedUser: IUser = await newUser.save();
            res.status(201).json({
                message: 'User added successfully',
                user: savedUser,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the user',
        });
    }
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await Users.find().maxTimeMS(30000); 
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
    }

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            params: { id },
            body,
        } = req
        const updateUsers: IUser | null = await Users.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allUsers: IUser[] = await Users.find()
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
        const deletedUsers: IUser | null = await Users.findByIdAndRemove(
            req.params.id
        )
        const allUsers: IUser[] = await Users.find()
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
        const user: IUser | null = await Users.findById(req.params.id)
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
        const user: IUser | null = await Users.findOne({email: req.params.email})
        res.status(200).json({
            message: "Success",
            user: user,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving User" })
        }
}

