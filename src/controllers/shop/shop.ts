import { Request, Response } from 'express';
import Shop from '../../models/shop';
import { IShop } from '../../types/shop';

// Get all shops
export const getAllShops = async (req: Request, res: Response): Promise<void> => {
    try {
        const shops: IShop[] = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single shop by ID
export const getShopById = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop | null = await Shop.findById(req.params.id);
        if (shop) {
            res.status(200).json(shop);
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Add a new shop
export const addShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop = new Shop(req.body);
        const newShop: IShop = await shop.save();
        res.status(201).json(newShop);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an existing shop by ID
export const updateShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop: IShop | null = await Shop.findById(req.params.id);
        if (shop) {
            shop.name = req.body.name;
            shop.location = req.body.location;
            shop.contactInfo = req.body.contactInfo;
            shop.workingHours = req.body.workingHours;
            const updatedShop: IShop = await shop.save();
            res.status(200).json(updatedShop);
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a shop by ID
export const deleteShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedShop: IShop | null = await Shop.findByIdAndDelete(req.params.id);
        if (deletedShop) {
            res.status(200).json(deletedShop);
        } else {
            res.status(404).send('Shop not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};