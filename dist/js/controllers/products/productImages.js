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
exports.upDateProductImage = exports.deleteProductImage = exports.getProductImages = exports.addProductImage = void 0;
const productImage_1 = __importDefault(require("../../models/productImage"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const addProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFile = req.file;
        const { product_id } = req.params;
        if (!product_id || !imageFile) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and an image file',
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
                const newProductImage = new productImage_1.default({
                    product: product_id,
                    product_image: cloudinaryResult.secure_url,
                });
                const newProductImageResult = yield newProductImage.save();
                res.status(201).json({
                    message: 'Product image added successfully',
                    productImage: newProductImageResult,
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
            message: 'An error occurred while adding the product image',
        });
    }
});
exports.addProductImage = addProductImage;
const getProductImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        if (!product_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id',
            });
            return;
        }
        const productImages = yield productImage_1.default.find({ product: product_id });
        res.status(200).json(productImages);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching the product images',
        });
    }
});
exports.getProductImages = getProductImages;
const deleteProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, product_image_id } = req.params;
        if (!product_id || !product_image_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }
        const deletedProductImage = yield productImage_1.default.findByIdAndDelete(product_image_id);
        res.status(200).json({
            message: 'Product image deleted successfully',
            productImage: deletedProductImage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the product image',
        });
    }
});
exports.deleteProductImage = deleteProductImage;
const upDateProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, product_image_id } = req.params;
        if (!product_id || !product_image_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }
        const updatedProductImage = yield productImage_1.default.findByIdAndUpdate(product_image_id, req.body, { new: true });
        res.status(200).json({
            message: 'Product image updated successfully',
            productImage: updatedProductImage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the product image',
        });
    }
});
exports.upDateProductImage = upDateProductImage;
