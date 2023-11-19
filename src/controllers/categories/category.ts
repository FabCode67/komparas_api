import { Request, Response } from 'express';
import Category from '../../models/category';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find().populate('children');
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getParentCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const parentCategories = await Category.find({ parent_id: null }).populate('children');
        res.status(200).json(parentCategories);
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

        let category;
        if (parent_id) {
            const parentCategory = await Category.findById(parent_id);
            if (!parentCategory) {
                res.status(400).json({ message: 'Parent category does not exist' });
                return;
            }

            category = new Category({ name, parent_id });

            if (!parentCategory.children) {
                parentCategory.children = [];
            }

            parentCategory.children.push(category._id);
            await parentCategory.save();
        } else {
            category = new Category({ name });
        }

        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
