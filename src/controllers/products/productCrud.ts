import { Response, Request } from "express";
import { IProducts } from '../../types/products';
import Products from "../../models/products";
import Category from "../../models/category";
import productImage from "../../models/productImage";
import { v2 as cloudinaryV2, UploadStream } from "cloudinary";
import streamifier from "streamifier";
import Shop from "../../models/shop";
import { Types } from 'mongoose';
import { spec } from "node:test/reporters";
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : 0;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : Number.MAX_SAFE_INTEGER;
    const categoryIds = req.query.category ? (req.query.category as string).split(",").map(id => new Types.ObjectId(id)) : [];
    const vendorIds = req.query.vendor_id ? (req.query.vendor_id as string).split(",") : [];
    const ramValues = req.query.ram ? (req.query.ram as string).split(",") : [];
    const storageValues = req.query.storage ? (req.query.storage as string).split(",") : [];
    const cameraValues = req.query.camera ? (req.query.camera as string).split(",") : [];
    const screenValues = req.query.screen ? (req.query.screen as string).split(",") : [];
    const typesValues = req.query.types ? (req.query.types as string).split(",") : [];
    const colorsValues = req.query.colors ? (req.query.colors as string).split(",") : [];
    let query: any = {
      $or: [
        { 'vendor_prices.price': { $gte: minPrice, $lte: maxPrice } },
        { 'vendor_prices.price': { $exists: false } }
      ]
    };
    if (categoryIds.length > 0) {
      const parentCategories = await Category.find({ _id: { $in: categoryIds } });
      const childCategoryIds: Types.ObjectId[] = [];
      for (const parentCategory of parentCategories) {
        const children = await Category.find({ parent_id: parentCategory._id });
        children.forEach(child => {
          childCategoryIds.push(child._id);
        });
      }
      const allCategoryIds = [...categoryIds, ...childCategoryIds];
      query.category = { $in: allCategoryIds };
    }

    if (vendorIds.length > 0) {
      query['$or'] = [
        { 'vendor_prices.vendor_id': { $in: vendorIds } },
        { 'vendor_prices.vendor_id': { $exists: false } }
      ];
    }
    if (ramValues.length > 0) {
      query['product_specifications'] = {
        $elemMatch: {
          key: { $regex: 'RAM', $options: 'i' },
          value: { $in: ramValues.map(ram => ram.replace(/\s/g, '')) }
        }
      };
    }
    if (storageValues.length > 0) {
      query['product_specifications'] = {
        $elemMatch: {
          key: "Ingano y’ububiko/ ubushobozi bwo kubika",
          value: { $in: storageValues.map(storage => storage.replace(/\s/g, '')) }
        }
      };
    }

    if (cameraValues.length > 0) {
      query['product_specifications'] = {
        $elemMatch: {
          key: { $regex: 'Foto', $options: 'i' },
          value: { $in: cameraValues }
        }
      };
    }

    if (screenValues.length > 0) {
      query['product_specifications'] = {
        $elemMatch: {
          key: 'Ikirahuri',
          value: { $in: screenValues }
        }
      };
    }

    if (typesValues.length > 0) {
      query['product_specifications'] = {
        $elemMatch: {
          key: 'Types',
          value: { $in: typesValues }
        }
      };
    }

    if (colorsValues.length > 0) {
      query['$or'] = [
        {
          'vendor_prices.colors': {
            $elemMatch: {
              $regex: colorsValues.map(color => `(^|,\\s*)${color}(\\s*,|$)`).join('|'),
              $options: 'i'
            }
          }
        },
        { 'vendor_prices.colors': { $exists: false } }
      ];
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

export const addShopToProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { vendor_id, price, colors } = req.body;
    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
      return;
    }

    // Check if vendor_id is valid
    if (!Types.ObjectId.isValid(vendor_id)) {
      res.status(400).json({
        status: false,
        message: 'Invalid vendor ID',
      });
      return;
    }

    // Find the product by ID
    const product = await Products.findById(productId);
    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

    // Find the vendor (shop) by ID
    const vendor = await Shop.findById(vendor_id);
    if (!vendor) {
      res.status(404).json({
        status: false,
        message: 'Vendor not found',
      });
      return;
    }

    // Check if vendor is already associated with the product
    const existingVendorIndex = product.vendor_prices.findIndex(vp => vp.vendor_id.toString() === vendor_id);

    if (existingVendorIndex !== -1) {
      // Update the existing vendor's price and colors if necessary
      product.vendor_prices[existingVendorIndex].price = price;
      product.vendor_prices[existingVendorIndex].colors = colors;
    } else {
      // Add new vendor to the product's vendor_prices
      const newVendorPrice = {
        vendor_id: vendor._id,
        vendor_name: vendor.name,
        price: price,
        colors: colors,
      };

      product.vendor_prices.push(newVendorPrice);
    }

    // Add vendor to the vendors list if not already present
    if (!product.vendors.includes(vendor._id)) {
      product.vendors.push(vendor._id);
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      status: true,
      message: 'Vendor added to product successfully',
      product,
    });
  } catch (error:any) {
    console.error('Error adding vendor to product:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while adding vendor to product',
      error: error.message, // Include error message for better debugging
    });
  }
};

export const updateShopInProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, vendorId } = req.params; // Get both IDs from the URL params
    const { price, colors } = req.body;

    // Validate productId
    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
      return;
    }

    // Validate vendorId
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid vendor ID',
      });
      return;
    }

    // Find the product by ID
    const product = await Products.findById(productId);
    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

    // Check if the vendor exists within the product's vendor_prices array
    const vendorIndex = product.vendor_prices.findIndex(vp => vp.vendor_id.toString() === vendorId);

    if (vendorIndex === -1) {
      res.status(404).json({
        status: false,
        message: 'Vendor not associated with this product',
      });
      return;
    }

    // Update the vendor's price and colors
    if (price !== undefined) {
      product.vendor_prices[vendorIndex].price = price;
    }
    if (colors !== undefined) {
      product.vendor_prices[vendorIndex].colors = colors;
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      status: true,
      message: 'Vendor details updated successfully',
      product,
    });
  } catch (error:any) {
    console.error('Error updating vendor details in product:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while updating vendor details',
      error: error.message,
    });
  }
};

export const removeShopFromProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, vendorId } = req.params; 
        if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
      return;
    }

    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid vendor ID',
      });
      return;
    }

    const product = await Products.findById(productId);
    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }
    const vendorIndex = product.vendor_prices.findIndex(vp => vp.vendor_id.toString() === vendorId);

    if (vendorIndex === -1) {
      res.status(404).json({
        status: false,
        message: 'Vendor not associated with this product',
      });
      return;
    }

    product.vendor_prices.splice(vendorIndex, 1);
    const vendorIdIndex = product.vendors.findIndex(v => v.toString() === vendorId);
    if (vendorIdIndex !== -1) {
      product.vendors.splice(vendorIdIndex, 1);
    }
    await product.save();
    res.status(200).json({
      status: true,
      message: 'Vendor removed from product successfully',
      product,
    });
  } catch (error:any) {
    console.error('Error removing vendor from product:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while removing vendor from product',
      error: error.message,
    });
  }
};

export const getAllShopsOnProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
      return;
    }
    const product = await Products.findById(productId)
      .populate('vendors', 'name location phone email'); 

    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Shops retrieved successfully',
      shops: product.vendors,
    });
  } catch (error:any) {
    console.error('Error retrieving shops for product:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while retrieving shops for product',
      error: error.message,
    });
  }
};

export const getSingleShopOnProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, vendorId } = req.params;
    if (!Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
      return;
    }
    if (!Types.ObjectId.isValid(vendorId)) {
      res.status(400).json({
        status: false,
        message: 'Invalid vendor ID',
      });
      return;
    }

    const product = await Products.findById(productId)
      .populate({
        path: 'vendors',
        match: { _id: vendorId }, 
        select: 'name location phone email', 
      });

    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }

    if (product.vendors?.length === 0) {
      res.status(404).json({
        status: false,
        message: 'Vendor not found in this product',
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Vendor retrieved successfully',
      shop: product.vendors[0],
    });
  } catch (error:any) {
    console.error('Error retrieving vendor for product:', error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while retrieving vendor for product',
      error: error.message,
    });

  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProducts | null = await Products.findById(req.params.productId)
    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }
    if (!product) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
      });
      return;
    }
    const imageFile = req.file;
    const product_specifications:Array<{
      key: string;
      value: string
    }> = req.body.product_specifications?.map((spec:any) => ({
      key: spec?.key?.toString(),
      value: spec?.value?.toString()
    }));
    const our_review:Array<{
      key: string;
      value: string
    }> = req.body.our_review?.map((rev:any) => ({
      key: rev?.key?.toString(),
      value: rev?.value?.toString()
    }));
    product.product_name = req.body.product_name || product.product_name;
    product.product_description = req.body.product_description || product.product_description;
    product.our_price = req.body.our_price || product.our_price;
    product.category = req.body.category || product.category;
    product.product_specifications = product_specifications.length ? product_specifications : product.product_specifications;
    product.our_review = our_review.length ? our_review : product.our_review;
    // check if the product has a product number if not generate one
    if (!product.product_number) {
      product.product_number = Math.floor(Math.random() * 1000000);
    }
    // check if the product number already exists
    const existingProductNumber = await Products.findOne({ product_number: product.product_number });
    if (existingProductNumber) {
      product.product_number = Math.floor(Math.random() * 1000000);
    }
    if (imageFile) {
      const result: UploadStream = cloudinaryV2.uploader.upload_stream(
        { folder: 'product-images' },
        async (error, cloudinaryResult: any) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              status: false,
              message: 'An error occurred while uploading the image to Cloudinary',
            });
            return;
          }
          product.product_image = cloudinaryResult.secure_url;
          await product.save();
          res.status(200).json({
            message: 'Product updated successfully',
            product,
          });
        }
      );
      streamifier.createReadStream(imageFile.buffer).pipe(result);
    } else {
      await product.save();
      res.status(200).json({
        message: 'Product updated successfully',
        product,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while updating the product',
    });
  }
};

   


export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_name, product_description, category_name, product_specifications, our_review, our_price } = req.body;
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
          const productSpecifications: Array<{ key: string; value: string }> = product_specifications?.map((spec: any) => ({
            key: spec?.key?.toString(),
            value: spec?.value?.toString(),
          }));
          const productReview: Array<{ key: string; value: string }> = our_review?.map((rev: any) => ({
            key: rev?.key?.toString(),
            value: rev?.value?.toString(),
          }));
            // add auto incriment product number
            let product_number = Math.floor(Math.random() * 1000000);
            // check if the product number already exists
            const existingProductNumber = await Products.findOne({ product_number });
            if (existingProductNumber) {
              product_number = Math.floor(Math.random() * 1000000);
            }
          const newProduct: IProducts = new Products({
            product_name: product_name,
            product_description: product_description,
            category: category._id,
            product_image: cloudinaryResult.secure_url,
            our_price: our_price,
            product_specifications: productSpecifications,
            our_review: productReview,
            product_number: product_number,
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


export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productIds = (req.query.productIds as string)?.split(',') ?? []; 
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
