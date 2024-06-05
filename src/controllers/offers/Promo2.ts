import { Response, Request } from "express";
import { IPromo2 } from "../../types/Promo2";
import Promo2 from "../../models/Promo2";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";

export const addPromo2 = async (req: Request, res: Response): Promise<void> => {
    try {
        const image = req.file;
        const { name, description, offer, price, product } = req.body;

        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please provide image file',
            });
            return;
        }

        // Check if other items exist in the table
        const existingItems = await Promo2.find({});
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
                    const Promo2ProductImage: IPromo2 = new Promo2({
                        name,
                        description,
                        offer,
                        price,
                        image: cloudinaryResult.secure_url,
                        product, // Reference to the existing product
                    });

                    const Promo2ProductImageResult: IPromo2 = await Promo2ProductImage.save();
                    res.status(201).json({
                        message: 'Product image added successfully',
                        productImage: Promo2ProductImageResult,
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

export const getPromo2 = async (req: Request, res: Response): Promise<void> => {
    try {
        const dayProducts: IPromo2[] = await Promo2.find().populate('product');
        res.status(200).json({ dayProducts });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updatePromo2 = async (req: Request, res: Response): Promise<void> => {
    try {
        const dayProducts: IPromo2[] = await Promo2.find();
        const dayProduct: IPromo2 | null = dayProducts[0]; // Get the single item

        const dimage = req.file;

        if (!dimage) {
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
            dayProduct.product = req.body.product; // Update the product reference

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
                        const updatedDayProduct: IPromo2 = await dayProduct.save();
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
};
