import { Response, Request } from "express";
import { IUser } from "../../types/users";
import Users from "../../models/Users/users";

export const changeUserRoleToAdmin =  async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUser | null = await Users.findByIdAndUpdate(req.params.id, {role: "admin"})

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        if(user.status === "admin") {
            res.status(401).json({
                status: false,
                message: "User already admin"
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


export const changeUserRoleToVendor =  async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUser | null = await Users.findByIdAndUpdate(req.params.id, {role: "vendor"})

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        if(user.status === "vendor") {
            res.status(401).json({
                status: false,
                message: "User already vendor"
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

export const changeUserRoleToBuyer =  async (req: Request, res: Response): Promise<void> => {
    try{
        const user: IUser | null = await Users.findByIdAndUpdate(req.params.id, {role: "buyer"})

        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }

        if(user.status === "buyer") {
            res.status(401).json({
                status: false,
                message: "User already buyer"
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




