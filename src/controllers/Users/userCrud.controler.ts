import { Response, Request } from "express";
import { IUser } from "../../types/users";
import Users from "../../models/users";
import { isValidEmail } from "../../middleware/emailValidity";
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "first_name" | "last_name" | "email" | "password" | "confirm_password" | "role">;
        const imageFile = req.file;

        if (!body.first_name || !body.last_name || !body.email || !body.password || !body.confirm_password || !body.role || !imageFile) {
            res.status(400).json({
                status: false,
                message: "Please fill all fields and upload an image file",
            });
            return;
        }

        if (body.password !== body.confirm_password) {
            res.status(400).json({
                status: false,
                message: "Password does not match",
            });
            return;
        }

        if (body.password.length < 6) {
            res.status(400).json({
                status: false,
                message: "Password must be at least 6 characters",
            });
            return;
        }

        if (!isValidEmail(body.email)) {
            res.status(400).json({
                status: false,
                message: "Invalid email address",
            });
            return;
        }

        const existingUser = await Users.findOne({ email: body.email });

        if (existingUser) {
            res.status(409).json({
                status: false,
                message: "Email already registered",
            });
            return;
        }

        const result: UploadStream = cloudinaryV2.uploader.upload_stream(
            { folder: 'user-profile-images' },
            (error: any, cloudinaryResult: UploadApiResponse | undefined) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                } else {
                    const newUser: IUser = new Users({
                        first_name: body.first_name,
                        last_name: body.last_name,
                        email: body.email,
                        password: body.password,
                        confirm_password: body.confirm_password,
                        role: body.role,
                        status: "enabled",
                        profile_picture: cloudinaryResult ? cloudinaryResult.secure_url : undefined,
                    });

                    newUser.save()
                        .then((newUser: IUser) => {
                            Users.find()
                                .then((allUsers: IUser[]) => {
                                    res.status(201).json({
                                        message: 'User added successfully',
                                        user: newUser,
                                        users: allUsers,
                                    });
                                })
                                .catch((err) => {
                                    console.error(err);
                                    res.status(500).json({
                                        status: false,
                                        message: 'An error occurred while fetching all users',
                                    });
                                });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({
                                status: false,
                                message: 'An error occurred while saving the user',
                            });
                        });
                }
            }
        );

        if (!result) {
            throw new Error("Cloudinary upload failed");
        }

        if (imageFile && imageFile.buffer) {
            streamifier.createReadStream(imageFile.buffer).pipe(result);
        } else {
            res.status(400).json({
                status: false,
                message: 'No image buffer provided',
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

