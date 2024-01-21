import { Request, Response } from 'express';
import Contact from '../../models/contact';

// Define a list of sensitive words or phrases
const sensitiveWords = ['iiiddd', 'jjdjdd', 'dkcmkdk', 'jewvd', 'hhh'];

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body;

        // Check if the message contains any sensitive words or phrases
        const containsSensitiveContent = sensitiveWords.some(word => message.includes(word));

        if (containsSensitiveContent) {
            return res.status(400).json({ message: 'Votre message contient un langage insensible.' });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ message: 'Votre message a bien été reçu ; nous vous répondrons bientôt.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
};


export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Contact.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
}

export const updateMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        // Check if the message contains any sensitive words or phrases
        const containsSensitiveContent = sensitiveWords.some(word => message.includes(word));

        if (containsSensitiveContent) {
            return res.status(400).json({ message: 'Votre message contient un langage insensible.' });
        }

        await Contact.findByIdAndUpdate(id, { name, email, message });
        res.status(200).json({ message: 'Message mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
}

