import { Request, Response } from "express";
import nodemailer from "nodemailer";
import JobApplicant from "../models/jobApplicant";
import IjobApplicant from "../types/job";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, 
    },
});

export const replyToJobApplicant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; 
        const { subject, message } = req.body; 

        const jobApplicant: IjobApplicant | null = await JobApplicant.findById(id);

        if (!jobApplicant) {
            res.status(404).json({ message: "Ibyo mukeneye ntabihari" });
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: jobApplicant.email, 
            subject: subject, 
            text: message, 
            html: `<p>${message}</p>`, 
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Ubutumwa bwoherejwe neza" });
    } catch (error) {
        console.error("Habayemo ikibazo mwongere mugerageze:", error);
        res.status(500).json({ message: "Habayemo ikibazo mwongere mugerageze" });
    }
};
