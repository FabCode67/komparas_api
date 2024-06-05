import { Response, Request } from "express";
import { IProductImage } from '../../types/productImage';
import ProductImages from '../../models/productImage';
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";

export const addProductImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const imageFile = req.file;

        const { product_id } = req.params;

        if (!product_id || !imageFile) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and an image file',
            });
            return;
        }

        const result: UploadStream = cloudinaryV2.uploader.upload_stream(
            { folder: 'product-images' },
            async (error, cloudinaryResult: any) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                } else {
                    const newProductImage: IProductImage = new ProductImages({
                        product: product_id, 
                        product_image: cloudinaryResult.secure_url,
                    });

                    const newProductImageResult: IProductImage = await newProductImage.save();
                    res.status(201).json({
                        message: 'Product image added successfully',
                        productImage: newProductImageResult,
                    });
                }
            }
        );

        if (!result) {
            throw new Error("Cloudinary upload failed");
        }
        streamifier.createReadStream(imageFile.buffer).pipe(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the product image',
        });
    }
};

export const getProductImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id } = req.params;

        if (!product_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id',
            });
            return;
        }
        const productImages = await ProductImages.find({ product: product_id });
        res.status(200).json(productImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching the product images',
        });
    }
}

export const deleteProductImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, product_image_id } = req.params;

        if (!product_id || !product_image_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }
        const deletedProductImage = await ProductImages.findByIdAndDelete(product_image_id);
        res.status(200).json({
            message: 'Product image deleted successfully',
            productImage: deletedProductImage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the product image',
        });
    }
}

export const upDateProductImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, product_image_id } = req.params;

        if (!product_id || !product_image_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }
        
        const updatedProductImage = await ProductImages.findByIdAndUpdate(product_image_id, req.body, { new: true });
        res.status(200).json({
            message: 'Product image updated successfully',
            productImage: updatedProductImage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the product image',
        });
    }
}
