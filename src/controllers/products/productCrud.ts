import { Response, Request } from "express"
import { IProducts } from '../../types/products'
import Products from "../../models/products"
import Category from "../../models/category";
import productImage from "../../models/productImage";
import { v2 as cloudinaryV2, UploadApiResponse, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import Shop from "../../models/shop";
import { IShop } from "../../types/shop";
import { Types } from 'mongoose';


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
    const product: IProducts | null | any = await Products.findById(productId);

    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

    const productImages = await productImage.find({ product: product._id });
    const productCategory = await Category.findById(product.category);

    // Fetch details for each vendor in the product.vendors array
    const vendorDetailsPromises = product?.vendors?.map(async (vendorId: any) => {
      const vendor = await Shop.findById(vendorId);
      return vendor;
    });

    // Wait for all vendor details to be fetched
    const vendorDetails = await Promise.all(vendorDetailsPromises);

    res.status(200).json({
      status: true,
      product: {
        ...product.toObject(),
        product_images: productImages,
        category: productCategory,
        vendors: vendorDetails, // Return an array of vendor details
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
    const { product_name, product_price, product_quantity, product_category, product_description, category_name, vendor_prices, specifications } = req.body;
    const imageFile = req.file;

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

          const vendors = await Shop.find({ _id: { $in: vendor_prices.map((vp: any) => vp.vendor_id) } });
          const productSpecifications: Array<{ key: string; value: string }> = specifications?.map((spec: any) => ({
            key: spec?.key?.toString(),
            value: spec?.value?.toString(),
          }));

          const newProduct: IProducts = new Products({
            product_name: product_name,
            product_description: product_description,
            category: category._id,
            product_image: cloudinaryResult.secure_url,
            vendors: vendors?.map(vendor => vendor._id),
            product_specifications: productSpecifications,
            vendor_prices: vendor_prices,
            product_price: product_price,
            product_quantity: product_quantity,
            product_category: product_category,

          });

          const newProductResult: IProducts = await newProduct.save();
          res.status(201).json({
            message: 'Product added successfully',
            product: newProductResult,
          });
        }
      });

    if (!result) {
      throw new Error("Cloudinary upload failed");
    }

    streamifier.createReadStream(imageFile.buffer).pipe(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: err,
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
    const { product_name, product_description, category_name, vendor_prices, specifications } = req.body;
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

          let existingVendors: Types.ObjectId[] | IShop[] = [];
          const existingProduct = await Products.findById(productId);
          if (existingProduct) {
            existingVendors = existingProduct.vendors;
          }

          let newVendors: IShop[] = [];
          if (vendor_prices) {
            // Fetch details of the new vendors and filter out existing vendors
            const vendorIds = vendor_prices.map((vp: any) => vp.vendor_id);
            newVendors = await Shop.find({ _id: { $in: vendorIds, $nin: existingVendors } });
          }

          // Combine existing vendors and new vendors
          const mergedVendors: any[] | IShop[] = [...existingVendors, ...newVendors];

          // Create the updatedProduct object
          const updatedProduct: any = {
            product_name: product_name,
            product_description: product_description,
            category: category._id,
            product_image: cloudinaryResult.secure_url,
            vendors: mergedVendors.map((vendor) => (vendor instanceof Types.ObjectId ? vendor : vendor._id)),
            product_specifications: specifications, // Include specifications in the update
            vendor_prices: vendor_prices,
          };

          const updatedProductResult = await Products.findByIdAndUpdate(productId, updatedProduct, {
            new: true,
          });

          res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProductResult,
          });
        }
      }
    );

    if (!result) {
      throw new Error('Cloudinary upload failed');
    }

    streamifier.createReadStream(imageFile.buffer).pipe(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: err,
      message: 'An error occurred while updating the product',
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



export const removeProductSpecification = async (req: Request, res: Response): Promise<void> => {
  try {
      const productId = req.params.productId;
      const specificationId = req.params.specificationId;

      const product = await Products.findById(productId);

      if (!product) {
          res.status(404).json({
              status: false,
              message: 'Product not found',
          });
          return;
      }

      // Check if product_specifications is defined
      if (!product.product_specifications) {
          res.status(400).json({
              status: false,
              message: 'Product does not have any specifications',
          });
          return;
      }

      // Find and remove the specification from the product
      const updatedSpecifications = product.product_specifications.filter(
          (specification: any) => specification._id.toString() !== specificationId
      );

      // Update the product with the new specifications
      const updatedProduct = await Products.findByIdAndUpdate(
          productId,
          { product_specifications: updatedSpecifications },
          { new: true }
      );

      res.status(200).json({
          status: true,
          message: 'Specification removed successfully',
          product: updatedProduct,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          status: false,
          error: error,
          message: 'An error occurred while removing the specification',
      });
  }
};