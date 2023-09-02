import { Response, Request } from "express"
import { IProducts } from '../../types/products'
import Products from "../../models/products"
import { log } from "console";
import Categories from "../../models/categories";


export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProducts[] = await Products.find().maxTimeMS(30000); 
        res.status(200).json({ products })
    } catch (error) {
        throw error
    }
    }

    export const addProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body as Pick<IProducts, 'product_name' | 'product_description' | 'product_price' | 'product_quantity' | 'category_name' | 'product_image' | 'product_status'>;
            if (!body.product_name || !body.product_description || !body.product_price || !body.product_quantity || !body.category_name) {
                 res.status(400).json({
                    status: false,
                    message: 'Please fill all required fields',
                });
                return;
            }
    
            // Find the category by name
            const category = await Categories.findOne({ category_name: body.category_name });
    
            if (!category) {
                 res.status(404).json({
                    status: false,
                    message: 'Category not found',
                });
                return;
            }
    
            const newProduct: IProducts = new Products({
                product_name: body.product_name,
                product_description: body.product_description,
                product_price: body.product_price,
                product_quantity: body.product_quantity,
                category: category._id, // Use the _id of the found category
            });
    
            const newProductResult: IProducts = await newProduct.save();
            res.status(201).json({
                message: 'Product added successfully',
                product: newProductResult,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: false,
                message: 'An error occurred while adding the product',
            });
        }
    };
    