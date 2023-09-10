import { Response, Request } from "express";
import Subcategories from "../../models/subcategories"
import  Categories  from "../../models/categories"
import { ISubcategory } from "../../types/subcategory";
import { IProducts } from "../../types/products";
import Products from "../../models/products";


export const getAllSubCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: ISubcategory[] = await Subcategories.find().maxTimeMS(30000);
        res.status(200).json( { categories})
    } catch (err) {
        throw err
    }
}

export const addSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ISubcategory, 'subcategory_name' | 'category_name' | 'subcategory_description' >;
        if (!body.subcategory_name || !body.category_name || !body.subcategory_description) {
            res.status(400).json({
                status: false,
                message: 'Please fill all required fields',
            });
            return;
        }

        const category = await Categories.findOne({ category_name: body.category_name });

        if (!category) {
            res.status(404).json({
                status: false,
                message: 'Category not found',
            });
            return;
        }

        const newSubcategory: ISubcategory = new Subcategories({
            subcategory_name: body.subcategory_name,
            subcategory_description: body.subcategory_description,
            category: category._id,
        });

        const newSubcategoryResult: ISubcategory = await newSubcategory.save();
        res.status(201).json({
            message: 'Subcategory added successfully',
            subcategory: newSubcategoryResult,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the subcategory',
        });
    }
}

export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {

    try{
        const { params: { id }, body } = req;
        const existingSubcategory = await Subcategories.findOne({ subcategory_name: body.subcategory_name });
        if(existingSubcategory){
            res.status(409).json({
                status: false,
                message: "subcategory already exists"
        });
        return;
    }
    const updatedSubcategory: ISubcategory | null = await Subcategories.findByIdAndUpdate(
        { _id: id },
        body
    );
    const allSubcategories: ISubcategory[] = await Subcategories.find();
    res.status(200).json({
        message: "Subcategory updated",
        subcategory: updatedSubcategory,
        subcategories: allSubcategories,
    });
} catch (error) {
    res.status(500).json({ message: "Error updating subcategory" })
}
}

export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategoryId = req.params.subcategoryId; 
        const deletedSubcategory = await Subcategories.findByIdAndDelete(subcategoryId);

        if (!deletedSubcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Subcategory deleted successfully',
            subcategory: deletedSubcategory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the subcategory',
        });
    }
}

export const getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategory: ISubcategory | null = await Subcategories.findById(req.params.subcategoryId)
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" })
        }
}

export const getSubCategoryByCategory = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategory: ISubcategory | null = await Subcategories.findOne({category: req.params.categoryId})
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" })
        }
}

export const getSubCategoryByName = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategory: ISubcategory | null = await Subcategories.findOne({subcategory_name: req.params.subcategory_name})
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" })
        }
}

export const getSubCategoryByDescription = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategory: ISubcategory | null = await Subcategories.findOne({subcategory_description: req.params.subcategory_description})
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" })
        }
}

export const getSubcategoryWithProducts = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategoryId = req.params.subcategoryId;
        const subcategory: ISubcategory | null = await Subcategories.findById(subcategoryId).maxTimeMS(3000);

        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }

        const products: IProducts[] = await Products.find({ subcategory: subcategory._id }).maxTimeMS(3000);

        res.status(200).json({
            subcategory,
            products,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with products',
        });


    }
}

export const getSubcategoryWithCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategory: ISubcategory | null = await Subcategories.findById(req.params.subcategoryId).maxTimeMS(3000);

        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }

        const category: ISubcategory[] = await Subcategories.find({ subcategory: subcategory._id }).maxTimeMS(3000);

        res.status(200).json({
            subcategory,
            category,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with category',
        });
    }
}

export const getSubcategoryWithCategoryName = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategory: ISubcategory | null = await Subcategories.findById(req.params.subcategoryId).maxTimeMS(3000);

        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }

        const category: ISubcategory[] = await Subcategories.find({ subcategory: subcategory._id }).maxTimeMS(3000);

        res.status(200).json({
            subcategory,
            category,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with category',
        });
    }
}

