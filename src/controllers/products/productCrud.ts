import { Response, Request } from "express"
import { IProducts } from '../../types/products'
import Products from "../../models/products"
import Category from "../../models/category";
import productImage from "../../models/productImage";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import Shop from "../../models/shop";
import { IShop } from "../../types/shop";
import { Types } from 'mongoose';
import { spec } from "node:test/reporters";


export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : 0;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : Number.MAX_SAFE_INTEGER;
    const categoryId = req.query.category;
    const vendorIds = req.query.vendor_id ? (req.query.vendor_id as string).split(",") : [];
    const ramValues = req.query.ram ? (req.query.ram as string).split(",") : [];
    const storageValues = req.query.storage ? (req.query.storage as string).split(",") : [];
    const cameraValues = req.query.camera ? (req.query.camera as string).split(",") : [];
    const typesValues = req.query.types ? (req.query.types as string).split(",") : [];

    let query: any = {
      'vendor_prices.price': { $gte: minPrice, $lte: maxPrice }
    };

    if (categoryId) {
      query.category = categoryId;
    }
    if (vendorIds.length > 0) {
      query['vendor_prices.vendor_id'] = { $in: vendorIds }; 
    }
    if (ramValues.length > 0) {
      query['product_specifications.key'] = 'RAM'; 
      query['product_specifications.value'] = { $in: ramValues };
    }
    if (storageValues.length > 0) {
      query['product_specifications.key'] = 'Storage'; 
      query['product_specifications.value'] = { $in: storageValues };
    }
    if (cameraValues.length > 0) {
      query['product_specifications.key'] = 'Camera'; 
      query['product_specifications.value'] = { $in: cameraValues };
    }
    if (typesValues.length > 0) {
      query['product_specifications.key'] = 'Types'; 
      query['product_specifications.value'] = { $in: typesValues };
    }

    const products: IProducts[] = await Products.find(query).maxTimeMS(30000);

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while retrieving the products",
    });
  }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
const productIds = (req.query.productIds as string)?.split(',') ?? [];    console.log("[[[[[[[[[[[[[[[[[[",productIds);
    
    const product = await Products.find({ _id: { $in: productIds } });
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



export const getSingleProductById = async (req: Request, res: Response): Promise<void> => {
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
}


export const getAllProductsWithCategoryName = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: IProducts[] = await Products.find().maxTimeMS(30000);
    const productsWithCategoryName: IProducts[] = await Promise.all(products.map(async (product: IProducts) => {
      const category = await Category.findById(product.category);
      return {
        ...product.toObject(),
        category_name: category?.name,
      };
    }));

    res.status(200).json({ products: productsWithCategoryName });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while fetching products',
    });
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

    const vendorDetailsPromises = product?.vendors?.map(async (vendorId: any) => {
      const vendor = await Shop.findById(vendorId);
      return vendor;
    });

    // add also the main product image into the product images array

    const productImagesWithMainImage = [
      {
        _id: product._id,
        product_image: product.product_image,
        product: product._id,
      },
      ...productImages,
    ];


    const vendorDetails = await Promise.all(vendorDetailsPromises);

    res.status(200).json({
      status: true,
      product: {
        ...product.toObject(),
        product_images: productImagesWithMainImage,
        category: productCategory,
        vendors: vendorDetails, 
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
    const { product_name, product_description, category_name, vendor_prices, specifications, our_review, our_price } = req.body;
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
const productReview: Array<{ key: string; value: string }> = our_review?.map((rev: any) => ({
  key: rev?.key?.toString(),
  value: rev?.value?.toString(),
}));
const newVendorPrices = vendor_prices.map((vp: any) => ({
  vendor_id: vp.vendor_id,
  vendor_name: vp.vendor_name,
  price: vp.price,
  colors: vp.colors,
  color: vp.color, // Add the color value here
}));
const newProduct: IProducts = new Products({
  product_name: product_name,
  product_description: product_description,
  category: category._id,
  product_image: cloudinaryResult.secure_url,
  vendors: vendors?.map(vendor => vendor._id),
  our_price: our_price,
  product_specifications: productSpecifications,
  vendor_prices: newVendorPrices, // Use the updated vendor_prices array
  our_review: productReview,
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
    const { product_name, product_description, category_name, vendor_prices, specifications, our_review } = req.body;
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
          let existingVendors: Types.ObjectId[] | IShop[] = [];
          const existingProduct = await Products.findById(productId);
          if (existingProduct) {
            existingVendors = existingProduct.vendors;
          }
          let newVendors: IShop[] = [];
          if (vendor_prices) {
            const vendorIds = vendor_prices.map((vp: any) => vp.vendor_id);
            newVendors = await Shop.find({ _id: { $in: vendorIds, $nin: existingVendors } });
          }
          const mergedVendors: any[] | IShop[] = [...existingVendors, ...newVendors];
          const updatedProduct: any = {
            product_name: product_name,
            product_description: product_description,
            category: category._id,
            product_image: cloudinaryResult.secure_url,
            vendors: mergedVendors.map((vendor) => (vendor instanceof Types.ObjectId ? vendor : vendor._id)),
            product_specifications: specifications,
            vendor_prices: vendor_prices,
            our_review: our_review,
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



// export const getProductById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const productId = req.params.productId;
//     const product = await Products.findById(productId);
//     if (!product) {
//       res.status(404).json({
//         status: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     res.status(200).json({
//       status: true,
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "An error occurred while retrieving the product",
//     });
//   }

// };


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
      if (!product.product_specifications) {
          res.status(400).json({
              status: false,
              message: 'Product does not have any specifications',
          });
          return;
      }
      const updatedSpecifications = product.product_specifications.filter(
          (specification: any) => specification._id.toString() !== specificationId
      );
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

export const getProductsByVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorId = req.params.vendorId;
    const products: IProducts[] = await Products.find({ vendors: vendorId });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while fetching products by vendor',
    });
  }
};