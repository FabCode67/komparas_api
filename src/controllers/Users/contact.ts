import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Contact from '../../models/contact';
import Notification from '../../models/Notification';
import { io } from '../..';

const sensitiveWords = ['iiiddd', 'jjdjdd', 'dkcmkdk', 'jewvd', 'hhh'];

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { name, email,phone, message } = req.body;
        const containsSensitiveContent = sensitiveWords.some(word => message.includes(word));

        if (containsSensitiveContent) {
            return res.status(400).json({ message: 'Votre message contient un langage insensible.' });
        }

        const contact = new Contact({ name, email, phone, message });
        await contact.save();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, 
            },
        });

        const mailOptions = {
            from: email, 
            to: process.env.EMAIL, 
            subject: `Ubutumwa bushya bwa ${name}`,
            text: `Wakiriye ubutumwa buvuye kuri ${name} (${email}):\n\n${message}`
        };

        await transporter.sendMail(mailOptions);

        const notification = new Notification({
            title: 'Ubutumwa bushya',
            message: `Wakiriye ubutumwa buvuye kuri ${name}.`,
            isRead: false
        });
        await notification.save();

        io.emit('newContactMessage', {
            title: notification.title,
            message: notification.message,
            createdAt: notification.createdAt
        });

        res.status(201).json({ message: 'Ubutumwa bwoherejwe neza!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Habayemo ikibazo, mwongere mugerageze' });
    }
};
