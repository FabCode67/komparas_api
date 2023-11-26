import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../../types/users';
import Users from '../../models/users';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, 'email' | 'password'>;

    if (!body.email || !body.password) {
      res.status(401).json({
        status: false,
        message: 'Please fill all fields',
      });
      return;
    }

    const user: IUser | null = await Users.findOne({ email: body.email });

    if (!user || !user.password) {
      res.status(401).json({
        status: false,
        message: 'Invalid credentials',
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        status: false,
        message: 'Invalid credentials',
      });
      return;
    }

    const payload = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      profile_picture: user.profile_picture,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).header('Authorization', `Bearer ${token}`).json({
      status: true,
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred during login',
    });
  }
};
