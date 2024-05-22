"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByVendor = exports.removeProductSpecification = exports.getProductsByCategory = exports.updateProduct = exports.deleteProduct = exports.addProduct = exports.getSingleProductWithImages = exports.getProductsWithImages = exports.getAllProductsWithCategoryName = exports.getSingleProductById = exports.getProductById = exports.getProducts = void 0;
const products_1 = __importDefault(require("../../models/products"));
const category_1 = __importDefault(require("../../models/category"));
const productImage_1 = __importDefault(require("../../models/productImage"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const shop_1 = __importDefault(require("../../models/shop"));
const mongoose_1 = require("mongoose");
// import { Types } from 'mongoose';
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
        const categoryIds = req.query.category ? req.query.category.split(",").map(id => new mongoose_1.Types.ObjectId(id)) : [];
        const vendorIds = req.query.vendor_id ? req.query.vendor_id.split(",") : [];
        const ramValues = req.query.ram ? req.query.ram.split(",") : [];
        const storageValues = req.query.storage ? req.query.storage.split(",") : [];
        const cameraValues = req.query.camera ? req.query.camera.split(",") : [];
        const typesValues = req.query.types ? req.query.types.split(",") : [];
        let query = {
            'vendor_prices.price': { $gte: minPrice, $lte: maxPrice }
        };
        // Retrieve child categories
        if (categoryIds.length > 0) {
            const parentCategories = yield category_1.default.find({ _id: { $in: categoryIds } });
            const childCategoryIds = [];
            for (const parentCategory of parentCategories) {
                const children = yield category_1.default.find({ parent_id: parentCategory._id });
                children.forEach(child => {
                    childCategoryIds.push(child._id);
                });
            }
            // Combine parent and child category IDs
            const allCategoryIds = [...categoryIds, ...childCategoryIds];
            query.category = { $in: allCategoryIds };
        }
        if (vendorIds.length > 0) {
            query['vendor_prices.vendor_id'] = { $in: vendorIds };
        }
        if (ramValues.length > 0) {
            query['product_specifications.key'] = 'RAM';
            query['product_specifications.value'] = { $in: ramValues };
        }
        if (storageValues.length > 0) {
            query['product_specifications.key'] = 'Ububiko bubika igihe kinini/Storage';
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
        const products = yield products_1.default.find(query).maxTimeMS(30000);
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the products",
        });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const productIds = (_b = (_a = req.query.productIds) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
        console.log("[[[[[[[[[[[[[[[[[[", productIds);
        const product = yield products_1.default.find({ _id: { $in: productIds } });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the product",
        });
    }
});
exports.getProductById = getProductById;
const getSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield products_1.default.findById(productId);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while retrieving the product",
        });
    }
});
exports.getSingleProductById = getSingleProductById;
const getAllProductsWithCategoryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.default.find().maxTimeMS(30000);
        const productsWithCategoryName = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_1.default.findById(product.category);
            return Object.assign(Object.assign({}, product.toObject()), { category_name: category === null || category === void 0 ? void 0 : category.name });
        })));
        res.status(200).json({ products: productsWithCategoryName });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching products',
        });
    }
});
exports.getAllProductsWithCategoryName = getAllProductsWithCategoryName;
const getProductsWithImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.default.find().maxTimeMS(30000);
        const productsWithImages = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const productImagesw = yield productImage_1.default.find({ product: product._id });
            return Object.assign(Object.assign({}, product.toObject()), { product_images: productImagesw });
        })));
        res.status(200).json({ products: productsWithImages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching products',
        });
    }
});
exports.getProductsWithImages = getProductsWithImages;
const getSingleProductWithImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const productId = req.params.productId;
        const product = yield products_1.default.findById(productId);
        if (!product) {
            res.status(404).json({
                status: false,
                message: 'Product not found',
            });
            return;
        }
        const productImages = yield productImage_1.default.find({ product: product._id });
        const productCategory = yield category_1.default.findById(product.category);
        const vendorDetailsPromises = (_c = product === null || product === void 0 ? void 0 : product.vendors) === null || _c === void 0 ? void 0 : _c.map((vendorId) => __awaiter(void 0, void 0, void 0, function* () {
            const vendor = yield shop_1.default.findById(vendorId);
            return vendor;
        }));
        // add also the main product image into the product images array
        const productImagesWithMainImage = [
            {
                _id: product._id,
                product_image: product.product_image,
                product: product._id,
            },
            ...productImages,
        ];
        const vendorDetails = yield Promise.all(vendorDetailsPromises);
        res.status(200).json({
            status: true,
            product: Object.assign(Object.assign({}, product.toObject()), { product_images: productImagesWithMainImage, category: productCategory, vendors: vendorDetails }),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching the product',
        });
    }
});
exports.getSingleProductWithImages = getSingleProductWithImages;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_name, product_description, category_name, vendor_prices, specifications, our_review, our_price, availableStorages } = req.body;
        const imageFile = req.file;
        if (!imageFile) {
            res.status(400).json({
                status: false,
                message: 'Please upload an image file',
            });
            return;
        }
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'product-images' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'An error occurred while uploading the image to Cloudinary',
                });
            }
            else {
                const category = yield category_1.default.findOne({ name: category_name });
                if (!category) {
                    res.status(404).json({
                        status: false,
                        message: 'Category not found',
                    });
                    return;
                }
                const vendors = yield shop_1.default.find({ _id: { $in: vendor_prices.map((vp) => vp.vendor_id) } });
                const productSpecifications = specifications === null || specifications === void 0 ? void 0 : specifications.map((spec) => {
                    var _a, _b;
                    return ({
                        key: (_a = spec === null || spec === void 0 ? void 0 : spec.key) === null || _a === void 0 ? void 0 : _a.toString(),
                        value: (_b = spec === null || spec === void 0 ? void 0 : spec.value) === null || _b === void 0 ? void 0 : _b.toString(),
                    });
                });
                const productReview = our_review === null || our_review === void 0 ? void 0 : our_review.map((rev) => {
                    var _a, _b;
                    return ({
                        key: (_a = rev === null || rev === void 0 ? void 0 : rev.key) === null || _a === void 0 ? void 0 : _a.toString(),
                        value: (_b = rev === null || rev === void 0 ? void 0 : rev.value) === null || _b === void 0 ? void 0 : _b.toString(),
                    });
                });
                const productAvailableStorages = availableStorages === null || availableStorages === void 0 ? void 0 : availableStorages.map((st) => {
                    var _a;
                    return ({
                        value: (_a = st === null || st === void 0 ? void 0 : st.value) === null || _a === void 0 ? void 0 : _a.toString(),
                    });
                });
                const newVendorPrices = vendor_prices.map((vp) => ({
                    vendor_id: vp.vendor_id,
                    vendor_name: vp.vendor_name,
                    price: vp.price,
                    colors: vp.colors,
                    color: vp.color, // Add the color value here
                }));
                const newProduct = new products_1.default({
                    product_name: product_name,
                    product_description: product_description,
                    category: category._id,
                    product_image: cloudinaryResult.secure_url,
                    vendors: vendors === null || vendors === void 0 ? void 0 : vendors.map(vendor => vendor._id),
                    our_price: our_price,
                    product_specifications: productSpecifications,
                    vendor_prices: newVendorPrices,
                    our_review: productReview,
                    availableStorages: productAvailableStorages,
                });
                const newProductResult = yield newProduct.save();
                res.status(201).json({
                    message: 'Product added successfully',
                    product: newProductResult,
                });
            }
        }));
        if (!result) {
            throw new Error("Cloudinary upload failed");
        }
        streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            error: err,
            message: 'An error occurred while adding the product',
        });
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield products_1.default.findByIdAndDelete(productId);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred while deleting the product",
        });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'product-images' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'An error occurred while uploading the image to Cloudinary',
                });
            }
            else {
                const category = yield category_1.default.findOne({ name: category_name });
                if (!category) {
                    res.status(404).json({
                        status: false,
                        message: 'Category not found',
                    });
                    return;
                }
                let existingVendors = [];
                const existingProduct = yield products_1.default.findById(productId);
                if (existingProduct) {
                    existingVendors = existingProduct.vendors;
                }
                let newVendors = [];
                if (vendor_prices) {
                    const vendorIds = vendor_prices.map((vp) => vp.vendor_id);
                    newVendors = yield shop_1.default.find({ _id: { $in: vendorIds, $nin: existingVendors } });
                }
                const mergedVendors = [...existingVendors, ...newVendors];
                const updatedProduct = {
                    product_name: product_name,
                    product_description: product_description,
                    category: category._id,
                    product_image: cloudinaryResult.secure_url,
                    vendors: mergedVendors.map((vendor) => (vendor instanceof mongoose_1.Types.ObjectId ? vendor : vendor._id)),
                    product_specifications: specifications,
                    vendor_prices: vendor_prices,
                    our_review: our_review,
                };
                const updatedProductResult = yield products_1.default.findByIdAndUpdate(productId, updatedProduct, {
                    new: true,
                });
                res.status(200).json({
                    message: 'Product updated successfully',
                    product: updatedProductResult,
                });
            }
        }));
        if (!result) {
            throw new Error('Cloudinary upload failed');
        }
        streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            error: err,
            message: 'An error occurred while updating the product',
        });
    }
});
exports.updateProduct = updateProduct;
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
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, category_name } = req.params;
        let categoryQuery;
        if (category_id) {
            categoryQuery = { _id: category_id };
        }
        else if (category_name) {
            categoryQuery = { name: category_name };
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Please provide a category ID or name',
            });
            return;
        }
        const category = yield category_1.default.findOne(categoryQuery);
        if (!category) {
            res.status(404).json({
                status: false,
                message: 'Category not found',
            });
            return;
        }
        const products = yield products_1.default.find({ category: category._id });
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching products by category',
        });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const removeProductSpecification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const specificationId = req.params.specificationId;
        const product = yield products_1.default.findById(productId);
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
        const updatedSpecifications = product.product_specifications.filter((specification) => specification._id.toString() !== specificationId);
        const updatedProduct = yield products_1.default.findByIdAndUpdate(productId, { product_specifications: updatedSpecifications }, { new: true });
        res.status(200).json({
            status: true,
            message: 'Specification removed successfully',
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: error,
            message: 'An error occurred while removing the specification',
        });
    }
});
exports.removeProductSpecification = removeProductSpecification;
const getProductsByVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendorId = req.params.vendorId;
        const products = yield products_1.default.find({ vendors: vendorId });
        res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching products by vendor',
        });
    }
});
exports.getProductsByVendor = getProductsByVendor;
