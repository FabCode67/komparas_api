import { Request, Response } from 'express';
import Category from '../../models/category';


export const getAllCategories= async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, parent_id } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) { 
            res.status(400).json({ message: 'Category with the same name already exists' });
            return;
        }
        const category = new Category({ name, parent_id });
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
