import { Response, Request } from "express";
import { ICategories } from "../../types/categories";
import Categories from "../../models/categories";
import { IProducts } from "../../types/products";
import Products from "../../models/products";

export const getCategories = async (req: Request, res: Response): Promise<void> =>{
    try{
        const categories: ICategories[] = await Categories.find().maxTimeMS(3000)
        res.status(200).json({ categories });
    } catch(err){
        throw err;
    }
}

export const getCategoryWithProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = req.params.categoryId; // Get the category ID from the route params

        // Find the category by ID
        const category: ICategories | null = await Categories.findById(categoryId).maxTimeMS(3000);

        if (!category) {
             res.status(404).json({
                status: false,
                message: "Category not found",
            });
            return
        }

        // Find products associated with the category using the category's _id
        const products: IProducts[] = await Products.find({ category: category._id }).maxTimeMS(3000);

        res.status(200).json({
            category,
            products,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching the category and its products",
        });
    }
};

export const addCategory = async (req: Request, res: Response): Promise<void> =>{
    try{
        const body = req.body as Pick<ICategories, "category_name" | "category_description">
        if(!body.category_name || !body.category_description){
            res.status(404).json({
                status: false,
                message: "please fill all fields"
            });
            return;
        }

        const existingCategory = await Categories.findOne({ category_name: body.category_name});

        if(existingCategory){
            res.status(409).json({
                status: false,
                message: "category already exists"
        });
        return;
        }

        const newCategory: ICategories = new Categories({
            category_name: body.category_name,
            category_description: body.category_description,
        });

        const newCategories: ICategories = await newCategory.save();
        const allCategories: ICategories[] = await Categories.find();

        res.status(200).json({
            message: "category added successfully",
            category: newCategories,
            categories: allCategories,
        });
    } catch(err){
        throw err;
    }
}


export const updateCategory = async (req: Request, res: Response): Promise<void> =>{

    try{
        const { params: { id }, body } = req;
        const existingCategory = await Categories.findOne({ category_name: body.category_name });
        if(existingCategory){
            res.status(409).json({
                status: false,
                message: "category already exists"
            });
            return;
        }
        const updateCategory: ICategories | null = await Categories.findByIdAndUpdate(
            { _id: id },
            body
        );
       
        const allCategories: ICategories[] = await Categories.find();
        res.status(200).json({
            message: "category updated",
            category: updateCategory,
            categories: allCategories,
        });
    } catch(err){
       res.status(500).json({ message: "Error updating category" });
    }
    }


export const deleteCategory = async (req: Request, res: Response): Promise<void> =>{
    try{
        const deletedCategory: ICategories | null = await Categories.findByIdAndRemove(
            req.params.id
        );
        const allCategories: ICategories[] = await Categories.find();
        res.status(200).json({
            message: "category deleted",
            category: deletedCategory,
            categories: allCategories,
        });
    } catch(err){
        res.status(500).json({ message: "Error deleting category" });
    }
}


export const getCategoryById = async (req: Request, res: Response): Promise<void> =>{
    try{
        const category: ICategories | null = await Categories.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            category: category,
        });
    } catch(err){
        throw err;
    }
}


export const getCategoryByName = async (req: Request, res: Response): Promise<void> =>{
    try{
        const category: ICategories | null = await Categories.findOne({ category_name: req.params.category_name });
        res.status(200).json({
            message: "Success",
            category: category,
        });
    } catch(err){
        throw err;
    }
}


export const getAllCategoriesWithProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: ICategories[] = await Categories.find().maxTimeMS(3000);

        const categoriesWithProducts: Array<{ category: ICategories, products: IProducts[] }> = [];

        for (const category of categories) {
            const categoryName = category.category_name;
            const foundCategory: ICategories | null = await Categories.findOne({ category_name: categoryName });

            if (foundCategory) {
                const products: IProducts[] = await Products.find({ category: foundCategory._id }).maxTimeMS(3000);

                categoriesWithProducts.push({
                    category: foundCategory,
                    products,
                });
            }
        }

        res.status(200).json(categoriesWithProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching categories with products",
        });
    }
};