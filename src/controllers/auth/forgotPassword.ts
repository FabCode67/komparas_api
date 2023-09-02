import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../../types/hello';
import Users from '../../models/Users/users';
import bcrypt  from 'bcrypt'
export const sendPasswordResetEmail = async (userEmail: string) => {
    const user = await Users.findOne({ email: userEmail });
    if (!user) {
        throw new Error('User not found');
    }

    const generateResetToken = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const resetToken = generateResetToken(); 
    const resetTokenExpiry = Date.now() + 3600000; 

    await Users.updateOne(
        { _id: user._id },
        { resetToken, resetTokenExpiry }
    );

    // const resetLink = `https://your-app.com/reset-password/${resetToken}`;
};

export const resetPassword = async (resetToken: string, newPassword: string) => {
    const user = await Users.findOne({ resetToken, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
        throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10); 

    await Users.updateOne(
        { _id: user._id },
        { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    );
};


