import { Response, Request } from "express";
import { IUser } from "../../types/hello";
import Users from "../../models/Users/users";


export const disableUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUser | null = await Users.findByIdAndUpdate(req.params.id, {status: "disabled"})

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        if(user.status === "disabled") {
            res.status(401).json({
                status: false,
                message: "User already disabled"
            });
            return;
        }

        res.status(200).json({
            message: "Success",
            user: user,
        })

    } catch (error) {
        res.status(500).json({ message: "Error retrieving User" })
        }
}

export const enableUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUser | null = await Users.findByIdAndUpdate(req.params.id, {status: "enabled"})

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        if(user.status === "enabled") {
            res.status(401).json({
                status: false,
                message: "User already enabled"
            });
            return;
        }

        res.status(200).json({
            message: "Success",
            user: user,
        })

    } catch (error) {
        res.status(500).json({ message: "Error retrieving User" })
        }
}

