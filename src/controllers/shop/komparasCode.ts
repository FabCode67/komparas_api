import { Request, Response } from 'express';
import KomparasCode from '../../models/komparasCode';
import { IKomparasCode } from '../../types/komparasCode';

export const addKomparasCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCode: IKomparasCode = new KomparasCode(req.body);
        const existingKomparasCode = await KomparasCode.findOne({ komparasCode: komparasCode.komparasCode });
        if (existingKomparasCode) {
            res.status(400).json({ message: 'Komparas Code already exists' });
            return;
        }
        const newKomparasCode: IKomparasCode = await komparasCode.save();
        res.status(201).json(newKomparasCode);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getKomparasCodes = async (req: Request, res: Response): Promise<void> => {
    try {
        const komparasCodes: IKomparasCode[] = await KomparasCode.find();
        res.status(200).json({ komparasCodes });
    } catch (error) {
        res.status(500).send(error);
    }
};