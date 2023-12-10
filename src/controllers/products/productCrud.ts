import { Response, Request } from "express"
import { IProducts } from '../../types/products'
import Products from "../../models/products"
import Category from "../../models/category";
import productImage from "../../models/productImage";
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import Shop from "../../models/shop";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProducts[] = await Products.find().maxTimeMS(30000);
        res.status(200).json({ products })
    } catch (error) {
        throw error
    }
}


export const getProductsWithImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProducts[] = await Products.find().maxTimeMS(30000);
        const productsWithImages: IProducts[] = await Promise.all(products.map(async (product: IProducts) => {
            const productImagesw = await productImage.find({ product: product._id });
            return {
                ...product.toObject(),
                product_images: productImagesw,
            };
        }));

        res.status(200).json({ products: productsWithImages });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching products',
        });
    }
};

export const getSingleProductWithImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const product: IProducts | null = await Products.findById(productId);
    
        if (!product) {
            res.status(404).json({
                status: false,
                message: 'Product not found',
            });
            return;
        }

        const productImages = await productImage.find({ product: product._id });
        const productCategory = await Category.findById(product.category);
        res.status(200).json({
            status: true,
            product: {
                ...product.toObject(),
                product_images: productImages,
                category: productCategory,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching the product',
        });
    }
};



export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_name, product_description, product_price, category_name, vendor_id } = req.body;
        const imageFile = req.file;
    
        // Check if no image file was uploaded
        if (!imageFile) {
          res.status(400).json({
            status: false,
            message: 'Please upload an image file',
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

                    const category = await Category.findOne({ name: category_name });

                    if (!category) {
                      res.status(404).json({
                        status: false,
                        message: 'Category not found',
                      });
                      return;
                    }
                              const vendor = await Shop.findOne({ _id: vendor_id })
                    const vendors = await Shop.find()

                    if (!category) {
                        res.status(404).json({
                            status: false,
                            message: 'Category not found',
                        });
                        return;
                    }

                    if (!vendor) {
                        res.status(404).json({
                            status: false,
                            message: 'Vendor not found'
                        });
                        return;
                    }


                    const newProduct: IProducts = new Products({
                        product_name: product_name,
                        product_description: product_description,
                        product_price: product_price,
                        category: category._id,
                        product_image: cloudinaryResult.secure_url,
                        vendor: vendor,
                      });
            

                    const newProductResult: IProducts = await newProduct.save();
                    res.status(201).json({
                        message: 'Product added successfully',
                        product: newProductResult,
                    });
                }
            })


        if (!result) {
            throw new Error("Cloudinary upload failed");
        }

        streamifier.createReadStream(imageFile.buffer).pipe(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the product',
        });
    }

};



export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            res.status(404).json({
                status: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while deleting the product",
        });
    }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(productId, updateData, {
            new: true,
        });

        if (!updatedProduct) {
            res.status(404).json({
                status: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while updating the product",
        });
    }
};


export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const product = await Products.findById(productId);
        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found",
            });
            return;
        }

        res.status(200).json({
            status: true,
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the product",
        });
    }
};


export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category_id, category_name } = req.params;
  
      let categoryQuery;
  
      if (category_id) {
        categoryQuery = { _id: category_id };
      } else if (category_name) {
        categoryQuery = { name: category_name };
      } else {
        res.status(400).json({
          status: false,
          message: 'Please provide a category ID or name',
        });
        return;
      }
  
      const category = await Category.findOne(categoryQuery);
  
      if (!category) {
        res.status(404).json({
          status: false,
          message: 'Category not found',
        });
        return;
      }
  
      const products: IProducts[] = await Products.find({ category: category._id });
  
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: 'An error occurred while fetching products by category',
      });
    }
  };