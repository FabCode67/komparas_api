import { Response, Request } from "express";
import { IPromo3 } from "../../types/Promo3";
import Promo3 from "../../models/Promo3";
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";

export const addPromo3 = async (req: Request, res: Response): Promise<void> => {
    try {
        const image = req.file;

        const { name, description, offer, price } = req.body;

        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please provide image file',
            });
            return;
        }

        // Check if other items exist in the table
        const existingItems = await Promo3.find({});
        if (existingItems.length > 0) {
            res.status(400).json({
                status: false,
                message: 'Only one item is required, please update an existing one',
            });
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
                    const Promo3ProductImage: IPromo3 = new Promo3({
                        name,
                        description,
                        offer,
                        price,
                        image: cloudinaryResult.secure_url,
                    });

                    const Promo3ProductImageResult: IPromo3 = await Promo3ProductImage.save();
                    res.status(201).json({
                        message: 'Product image added successfully',
                        productImage: Promo3ProductImageResult,
                    });
                }
            }
        );

        if (!result) {
            throw new Error("Cloudinary upload failed");
        }
        streamifier.createReadStream(image.buffer).pipe(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the product image',
        });
    }
};

export const getPromo3 = async (req: Request, res: Response): Promise<void> => {
    try {
        const dayProducts: IPromo3[] = await Promo3.find();
        res.status(200).json({ dayProducts });
    } catch (error) {
        res.status(500).send(error);
    }
}
export const updateProm3 = async (req: Request, res: Response): Promise<void> => {
    try {
        const dayProducts: IPromo3[] = await Promo3.find();
        const dayProduct: IPromo3 | null = dayProducts[0]; // Get the single item

        const dimage = req.file;

        if(!dimage) {
            res.status(400).json({
                status: false,
                message: 'Please provide an image file',
            });
            return;
        }
        

        if (dayProduct) {
            dayProduct.name = req.body.name;
            dayProduct.description = req.body.description;
            dayProduct.offer = req.body.offer;
            dayProduct.price = req.body.price;

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
                        dayProduct.image = cloudinaryResult.secure_url;
                        const updatedDayProduct: IPromo3 = await dayProduct.save();
                        res.status(200).json({
                            message: 'Product updated successfully',
                            product: updatedDayProduct,
                        });
                    }
                }
            );

            if (!result) {
                throw new Error("Cloudinary upload failed");
            }
            streamifier.createReadStream(dimage.buffer).pipe(result);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
