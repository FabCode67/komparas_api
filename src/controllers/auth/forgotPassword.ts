import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../../types/users';
import Users from '../../models/users';
import bcrypt  from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
export const forgotPassword = async (req: Request, res: Response) => {
   const { email } = req.body
   if (!email) {
       return res.status(400).json({ status:false, message: 'Email is required' });
   }

   try{
    const existingEmail = await Users.findOne({ email });
    if (!existingEmail) {
        return res.status(404).json({ status:false, message: 'Email not found' });
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await Users.updateOne(
        { _id: existingEmail._id },
        { resetToken, resetTokenExpiry }
    );

    const confirmUrl = `https://curious-kitten-7438aa.netlify.app?resetToken=${resetToken}`;

    const mailOptions = {
        from: 'mwanafunzifabrice@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `
            <p>Click the link below to reset your password</p>
            <a href="${confirmUrl}">${confirmUrl}</a>
        `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({status:true, message: 'Password reset email sent successfully' });


   } catch(err){
         console.error(err)
         res.status(500).json({ status:false, message: 'An error occurred while sending the email' });
   }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { resetToken, password, confirmPassword } = req.body;

    if (!resetToken || !password || !confirmPassword) {
        return res.status(400).json({ status:false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ status:false, message: 'Passwords do not match' });
    }

    try {
        const user = await Users.findOne({ resetToken });

        if (!user) {
            return res.status(404).json({ status:false, message: 'Invalid reset token' });
        }

        const userWithExpiry = user as IUser & { resetTokenExpiry: number };

        if (Date.now() > userWithExpiry.resetTokenExpiry) {
            return res.status(400).json({ status:false, message: 'Reset token has expired' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.updateOne(
            { _id: user._id },
            { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
        );

        res.status(200).json({ status:true, message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status:false, message: 'An error occurred while resetting the password' });
    }
}


