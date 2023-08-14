import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUSer } from '../../types/hello';
import Users from '../../models/Users/users';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUSer, 'email' | 'password'>;

        if (!body.email || !body.password) {
            res.status(401).json({
                status: false,
                message: 'Please fill all fields',
            });
        } else {
            const users: IUSer | null = await Users.findOne({
                email: body.email,
                password: body.password,
            });
            if (!users) {
                res.status(401).json({
                    status: false,
                    message: 'Invalid credentials',
                });
            } else {
                const token = jwt.sign(
                    { _id: users._id },
                    process.env.TOKEN_SECRET as string,
                    {
                        expiresIn: '1h',
                    }
                );
                res.status(200).json({
                    status: true,
                    message: 'Login successful',
                    token,
                    users,
                });
            }
        }
    } catch (error) {
        throw error;
    }
}