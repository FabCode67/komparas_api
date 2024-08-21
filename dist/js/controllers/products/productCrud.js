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
exports.getProductsByVendor = exports.removeProductSpecification = exports.getProductsByCategory = exports.deleteProduct = exports.getSingleProductWithImages = exports.getProductsWithImages = exports.getAllProductsWithCategoryName = exports.getSingleProductById = exports.getProductById = exports.addProduct = exports.updateProduct = exports.getSingleShopOnProduct = exports.getAllShopsOnProduct = exports.removeShopFromProduct = exports.updateShopInProduct = exports.addShopToProduct = exports.getProducts = void 0;
const products_1 = __importDefault(require("../../models/products"));
const category_1 = __importDefault(require("../../models/category"));
const productImage_1 = __importDefault(require("../../models/productImage"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const shop_1 = __importDefault(require("../../models/shop"));
const mongoose_1 = require("mongoose");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : Number.MAX_SAFE_INTEGER;
        const categoryIds = req.query.category ? req.query.category.split(",").map(id => new mongoose_1.Types.ObjectId(id)) : [];
        const vendorIds = req.query.vendor_id ? req.query.vendor_id.split(",") : [];
        const ramValues = req.query.ram ? req.query.ram.split(",") : [];
        const storageValues = req.query.storage ? req.query.storage.split(",") : [];
        const cameraValues = req.query.camera ? req.query.camera.split(",") : [];
        const screenValues = req.query.screen ? req.query.screen.split(",") : [];
        const typesValues = req.query.types ? req.query.types.split(",") : [];
        const colorsValues = req.query.colors ? req.query.colors.split(",") : [];
        let query = {
            $or: [
                { 'vendor_prices.price': { $gte: minPrice, $lte: maxPrice } },
                { 'vendor_prices.price': { $exists: false } }
            ]
        };
        if (categoryIds.length > 0) {
            const parentCategories = yield category_1.default.find({ _id: { $in: categoryIds } });
            const childCategoryIds = [];
            for (const parentCategory of parentCategories) {
                const children = yield category_1.default.find({ parent_id: parentCategory._id });
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
const addShopToProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { vendor_id, price, colors } = req.body;
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid product ID',
            });
            return;
        }
        // Check if vendor_id is valid
        if (!mongoose_1.Types.ObjectId.isValid(vendor_id)) {
            res.status(400).json({
                status: false,
                message: 'Invalid vendor ID',
            });
            return;
        }
        // Find the product by ID
        const product = yield products_1.default.findById(productId);
        if (!product) {
            res.status(404).json({
                status: false,
                message: 'Product not found',
            });
            return;
        }
        // Find the vendor (shop) by ID
        const vendor = yield shop_1.default.findById(vendor_id);
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
        }
        else {
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
        yield product.save();
        res.status(200).json({
            status: true,
            message: 'Vendor added to product successfully',
            product,
        });
    }
    catch (error) {
        console.error('Error adding vendor to product:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding vendor to product',
            error: error.message, // Include error message for better debugging
        });
    }
});
exports.addShopToProduct = addShopToProduct;
const updateShopInProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, vendorId } = req.params; // Get both IDs from the URL params
        const { price, colors } = req.body;
        // Validate productId
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid product ID',
            });
            return;
        }
        // Validate vendorId
        if (!mongoose_1.Types.ObjectId.isValid(vendorId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid vendor ID',
            });
            return;
        }
        // Find the product by ID
        const product = yield products_1.default.findById(productId);
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
        yield product.save();
        res.status(200).json({
            status: true,
            message: 'Vendor details updated successfully',
            product,
        });
    }
    catch (error) {
        console.error('Error updating vendor details in product:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating vendor details',
            error: error.message,
        });
    }
});
exports.updateShopInProduct = updateShopInProduct;
const removeShopFromProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, vendorId } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid product ID',
            });
            return;
        }
        if (!mongoose_1.Types.ObjectId.isValid(vendorId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid vendor ID',
            });
            return;
        }
        const product = yield products_1.default.findById(productId);
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
        yield product.save();
        res.status(200).json({
            status: true,
            message: 'Vendor removed from product successfully',
            product,
        });
    }
    catch (error) {
        console.error('Error removing vendor from product:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while removing vendor from product',
            error: error.message,
        });
    }
});
exports.removeShopFromProduct = removeShopFromProduct;
const getAllShopsOnProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid product ID',
            });
            return;
        }
        const product = yield products_1.default.findById(productId)
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
    }
    catch (error) {
        console.error('Error retrieving shops for product:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while retrieving shops for product',
            error: error.message,
        });
    }
});
exports.getAllShopsOnProduct = getAllShopsOnProduct;
const getSingleShopOnProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productId, vendorId } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid product ID',
            });
            return;
        }
        if (!mongoose_1.Types.ObjectId.isValid(vendorId)) {
            res.status(400).json({
                status: false,
                message: 'Invalid vendor ID',
            });
            return;
        }
        const product = yield products_1.default.findById(productId)
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
        if (((_a = product.vendors) === null || _a === void 0 ? void 0 : _a.length) === 0) {
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
    }
    catch (error) {
        console.error('Error retrieving vendor for product:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while retrieving vendor for product',
            error: error.message,
        });
    }
});
exports.getSingleShopOnProduct = getSingleShopOnProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const product = yield products_1.default.findById(req.params.productId);
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
        const product_specifications = (_b = req.body.product_specifications) === null || _b === void 0 ? void 0 : _b.map((spec) => {
            var _a, _b;
            return ({
                key: (_a = spec === null || spec === void 0 ? void 0 : spec.key) === null || _a === void 0 ? void 0 : _a.toString(),
                value: (_b = spec === null || spec === void 0 ? void 0 : spec.value) === null || _b === void 0 ? void 0 : _b.toString()
            });
        });
        const our_review = (_c = req.body.our_review) === null || _c === void 0 ? void 0 : _c.map((rev) => {
            var _a, _b;
            return ({
                key: (_a = rev === null || rev === void 0 ? void 0 : rev.key) === null || _a === void 0 ? void 0 : _a.toString(),
                value: (_b = rev === null || rev === void 0 ? void 0 : rev.value) === null || _b === void 0 ? void 0 : _b.toString()
            });
        });
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
        const existingProductNumber = yield products_1.default.findOne({ product_number: product.product_number });
        if (existingProductNumber) {
            product.product_number = Math.floor(Math.random() * 1000000);
        }
        if (imageFile) {
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'product-images' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                    return;
                }
                product.product_image = cloudinaryResult.secure_url;
                yield product.save();
                res.status(200).json({
                    message: 'Product updated successfully',
                    product,
                });
            }));
            streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
        }
        else {
            yield product.save();
            res.status(200).json({
                message: 'Product updated successfully',
                product,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the product',
        });
    }
});
exports.updateProduct = updateProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                const productSpecifications = product_specifications === null || product_specifications === void 0 ? void 0 : product_specifications.map((spec) => {
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
                // add auto incriment product number
                let product_number = Math.floor(Math.random() * 1000000);
                // check if the product number already exists
                const existingProductNumber = yield products_1.default.findOne({ product_number });
                if (existingProductNumber) {
                    product_number = Math.floor(Math.random() * 1000000);
                }
                const newProduct = new products_1.default({
                    product_name: product_name,
                    product_description: product_description,
                    category: category._id,
                    product_image: cloudinaryResult.secure_url,
                    our_price: our_price,
                    product_specifications: productSpecifications,
                    our_review: productReview,
                    product_number: product_number,
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
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const productIds = (_e = (_d = req.query.productIds) === null || _d === void 0 ? void 0 : _d.split(',')) !== null && _e !== void 0 ? _e : [];
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
    var _f;
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
        const vendorDetailsPromises = (_f = product === null || product === void 0 ? void 0 : product.vendors) === null || _f === void 0 ? void 0 : _f.map((vendorId) => __awaiter(void 0, void 0, void 0, function* () {
            const vendor = yield shop_1.default.findById(vendorId);
            return vendor;
        }));
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
