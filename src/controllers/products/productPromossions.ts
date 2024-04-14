import { Response, Request } from "express";
import { IProductPromossions } from '../../types/promossions'
import ProductPromossions from "../../models/ProductPromossions";
;

export const addProductPromossion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id } = req.params;
        const newProductImage: IProductPromossions = new ProductPromossions({
                        product: product_id, 
                        product_promossion: req.body.product_promossion
                    });

        res.status(201).json({ message: 'Product Promossion added successfully', productPromossion: await newProductImage.save() });

    } catch (err) {
       
    }
};

export const deleteProductImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, promossion_id } = req.params;

        if (!product_id || !promossion_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }

        const deletedProductImage = await ProductPromossions.findByIdAndDelete(promossion_id);

        res.status(200).json({
            message: 'Product promossion deleted successfully',
            productImage: deletedProductImage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the product promossion',
        });
    }
}

export const upadateProductPromossion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, promossion_id } = req.params;

        if (!product_id || !promossion_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and promossion_id',
            });
            return;
        }

        const updatedProductImage = await ProductPromossions.findByIdAndUpdate(promossion_id, req.body, { new: true });

        res.status(200).json({
            message: 'Product promossion updated successfully',
            productImage: updatedProductImage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the product promossion',
        });
    }
}