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
exports.deleteNativeProduct = exports.getNativeProductById = exports.getNativeProducts = exports.updateNativeProduct = exports.addNativeProduct = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const nativeProduct_1 = __importDefault(require("../../models/nativeProduct"));
const addNativeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, price, quantity, location, image } = req.body;
        const imageFile = req.file;
        // Check if at least one of the required fields is present
        if (!name || !description || !category || !price || !quantity || !location) {
            res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
            return;
        }
        const existingProduct = yield nativeProduct_1.default.findOne({ name: name });
        if (existingProduct) {
            res.status(400).json({
                status: false,
                message: "Product with this name already exists",
            });
            return;
        }
        // If an image file is provided, handle the upload
        if (imageFile) {
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: "products" }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: "Internal server error",
                        error: error.message,
                    });
                }
                else {
                    const product = new nativeProduct_1.default({
                        name,
                        description,
                        category,
                        price,
                        quantity,
                        location,
                        image: cloudinaryResult.secure_url,
                    });
                    yield product.save();
                    res.status(201).json({
                        status: true,
                        message: "Product added successfully",
                        data: product,
                    });
                }
            }));
            if (!result) {
                res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    error: "An error occurred while uploading the image to Cloudinary",
                });
            }
            streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
        }
        else {
            const product = new nativeProduct_1.default({
                name,
                description,
                category,
                price,
                quantity,
                location,
            });
            const savedProduct = yield product.save();
            res.status(201).json({
                status: true,
                message: "Product added successfully",
                data: savedProduct,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.addNativeProduct = addNativeProduct;
const updateNativeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const { name, description, category, price, quantity, location, image } = req.body;
        const imageFile = req.file;
        // Check if at least one of the required fields is present
        if (!name || !description || !category || !price || !quantity || !location) {
            res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
            return;
        }
        // Check if product with the same name already exists
        const existingProduct = yield nativeProduct_1.default.findOne({ name: name });
        if (existingProduct && existingProduct._id != productId) {
            res.status(400).json({
                status: false,
                message: "Product with this name already exists",
            });
            return;
        }
        // If an image file is provided, handle the upload
        if (imageFile) {
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: "products" }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    res.status(500).json({
                        status: false,
                        message: "Internal server error",
                        error: error.message,
                    });
                }
                else {
                    const product = yield nativeProduct_1.default.findByIdAndUpdate({ _id: productId }, {
                        name,
                        description,
                        category,
                        price,
                        quantity,
                        location,
                        image: cloudinaryResult.secure_url,
                    });
                    res.status(200).json({
                        status: true,
                        message: "Product updated successfully",
                        data: product,
                    });
                }
            }));
            if (!result) {
                res.status(500).json({
                    status: false,
                    message: "Internal server error",
                    error: "An error occurred while uploading the image to Cloudinary",
                });
            }
            streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
        }
        else {
            const product = yield nativeProduct_1.default.findByIdAndUpdate({ _id: productId }, {
                name,
                description,
                category,
                price,
                quantity,
                location,
            });
            res.status(200).json({
                status: true,
                message: "Product updated successfully",
                data: product,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.updateNativeProduct = updateNativeProduct;
const getNativeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield nativeProduct_1.default.find();
        res.status(200).json({
            status: true,
            message: "Products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.getNativeProducts = getNativeProducts;
const getNativeProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield nativeProduct_1.default.findById(productId);
        res.status(200).json({
            status: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.getNativeProductById = getNativeProductById;
const deleteNativeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield nativeProduct_1.default.findByIdAndRemove(productId);
        res.status(200).json({
            status: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.deleteNativeProduct = deleteNativeProduct;
