import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import { Response, Request } from "express";
import { INativeProducts } from "../../types/nativeProducts";
import NativeProducts from "../../models/nativeProduct";

export const addNativeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, category, price, quantity, location, image } = req.body;
        const imageFile = req.file;
  console.log(req.body);
  
        // Check if at least one of the required fields is present
        if (!name || !description || !category || !price || !quantity || !location ) {
            res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
            return;
        }

        // Check if product with the same name already exists

        const existingProduct: INativeProducts | null = await NativeProducts.findOne({ name: name });
        if (existingProduct) {
            res.status(400).json({
                status: false,
                message: "Product with this name already exists",
            });
            return;
        }

        // If an image file is provided, handle the upload

        if(imageFile) {
            const result: UploadStream = cloudinaryV2.uploader.upload_stream(
                {folder: "products"},
                async (error, cloudinaryResult: any) => {
                    if (error) {
                        res.status(500).json({
                            status: false,
                            message: "Internal server error",
                            error: error.message,
                        });
                    } else {
                        const product: INativeProducts = new NativeProducts({
                            name,
                            description,
                            category,
                            price,
                            quantity,
                            location,
                            image: cloudinaryResult.secure_url as string,
                        });
                        await product.save();
                        res.status(201).json({
                            status: true,
                            message: "Product added successfully",
                            data: product,
                        });
                    }
                }
            );

            if (!result) {
                res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    error: "An error occurred while uploading the image to Cloudinary",
                });
            }

            streamifier.createReadStream(imageFile.buffer).pipe(result);
        }
        else {
        const product: INativeProducts = new NativeProducts({
            name,
            description,
            category,
            price,
            quantity,
            location,
        });

        const savedProduct: INativeProducts = await product.save();
        res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: savedProduct,
        });
    }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
}
