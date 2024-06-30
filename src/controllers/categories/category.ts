import { Request, Response } from 'express';
import Category from '../../models/category';
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, parent_id } = req.body;
        const image = req.file;

        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please upload an image file',
            });
            return;
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: 'Category with the same name already exists' });
            return;
        }

        const result: UploadStream = cloudinaryV2.uploader.upload_stream(
            { folder: 'image' },
            async (error, cloudinaryResult: any) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                } else {
                    let category;
                    if (parent_id) {
                        const parentCategory = await Category.findById(parent_id);
                        if (!parentCategory) {
                            res.status(400).json({ message: 'Parent category does not exist' });
                            return;
                        }

                        category = new Category({ name, parent_id, image: cloudinaryResult.secure_url });

                        if (!parentCategory.children) {
                            parentCategory.children = [];
                        }

                        parentCategory.children.push(category._id);
                        await parentCategory.save();
                    } else {
                        category = new Category({ name, image: cloudinaryResult.secure_url });
                    }

                    await category.save();
                    res.status(201).json({ message: 'Category added successfully', category });
                }
            });

        if (!result) {
            throw new Error("Cloudinary upload failed");
        }

        streamifier.createReadStream(image.buffer).pipe(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


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

export const getCategoryByNameOrID = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;
        const categoryToFind = await Category.findById(category).populate('children');

        if (!categoryToFind) {
            const categoryByName = await Category.findOne({ name: category }).populate('children');

            if (!categoryByName) {
                res.status(404).json({ message: 'Category not found' });
                return;
            }

            res.status(200).json(categoryByName);
            return;
        }

        res.status(200).json(categoryToFind);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category_id } = req.params;

        if (!category_id) {
            res.status(400).json({ message: 'Invalid category ID' });
            return;
        }

        const categoryToDelete = await Category.findById(category_id);

        if (!categoryToDelete) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        if (categoryToDelete.children && categoryToDelete.children.length > 0) {
            res.status(400).json({ message: 'Cannot delete a category with children. Delete the children first.' });
            return;
        }

        if (categoryToDelete.parent_id) {
            const parentCategory = await Category.findById(categoryToDelete.parent_id);

            if (parentCategory) {
                parentCategory.children = parentCategory?.children?.filter(childId => childId.toString() !== category_id) ?? [];
                await parentCategory.save();
            }
        }

        await categoryToDelete.deleteOne();

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category_id } = req.params;
        const { name, parent_id } = req.body;
        const image = req.file;

        if (!category_id) {
            res.status(400).json({ message: 'Invalid category ID' });
            return;
        }

        const categoryToUpdate = await Category.findById(category_id);
        if (!categoryToUpdate) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        if (name && name !== categoryToUpdate.name) {
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                res.status(400).json({ message: 'Category with the same name already exists' });
                return;
            }
        }

        if (parent_id) {
            const parentCategory = await Category.findById(parent_id);
            if (!parentCategory) {
                res.status(400).json({ message: 'Parent category does not exist' });
                return;
            }

            if (categoryToUpdate.parent_id !== parent_id) {
                const oldParentCategory:any = await Category.findById(categoryToUpdate.parent_id);
                if (oldParentCategory) {
                    oldParentCategory.children = oldParentCategory.children.filter((childId: { toString: () => string; }) => childId.toString() !== category_id);
                    await oldParentCategory.save();
                }

                parentCategory.children = parentCategory.children ?? [];
                parentCategory.children.push(categoryToUpdate._id);
                await parentCategory.save();

                categoryToUpdate.parent_id = parent_id;
            }
        }

        if (name) {
            categoryToUpdate.name = name;
        }

        if (image) {
            const result: UploadStream = cloudinaryV2.uploader.upload_stream(
                { folder: 'image' },
                async (error, cloudinaryResult: any) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({
                            status: false,
                            message: 'An error occurred while uploading the image to Cloudinary',
                        });
                        return;
                    } else {
                        categoryToUpdate.image = cloudinaryResult.secure_url;
                        await categoryToUpdate.save();
                        res.status(200).json({ message: 'Category updated successfully', category: categoryToUpdate });
                    }
                }
            );

            if (!result) {
                throw new Error('Cloudinary upload failed');
            }

            streamifier.createReadStream(image.buffer).pipe(result);
        } else {
            await categoryToUpdate.save();
            res.status(200).json({ message: 'Category updated successfully', category: categoryToUpdate });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};