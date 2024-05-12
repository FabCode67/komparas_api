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
exports.updatePromo2 = exports.getPromo2 = exports.addPromo2 = void 0;
const Promo2_1 = __importDefault(require("../../models/Promo2"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const addPromo2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const { name, description, offer, price } = req.body;
        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please provide image file',
            });
            return;
        }
        // Check if other items exist in the table
        const existingItems = yield Promo2_1.default.find({});
        if (existingItems.length > 0) {
            res.status(400).json({
                status: false,
                message: 'Only one item is required, please update an existing one',
            });
            return;
        }
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'image' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'An error occurred while uploading the image to Cloudinary',
                });
            }
            else {
                const Promo2ProductImage = new Promo2_1.default({
                    name,
                    description,
                    offer,
                    price,
                    image: cloudinaryResult.secure_url,
                });
                const Promo2ProductImageResult = yield Promo2ProductImage.save();
                res.status(201).json({
                    message: 'Product image added successfully',
                    productImage: Promo2ProductImageResult,
                });
            }
        }));
        if (!result) {
            throw new Error("Cloudinary upload failed");
        }
        streamifier_1.default.createReadStream(image.buffer).pipe(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the product image',
        });
    }
});
exports.addPromo2 = addPromo2;
const getPromo2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayProducts = yield Promo2_1.default.find();
        res.status(200).json({ dayProducts });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPromo2 = getPromo2;
const updatePromo2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayProducts = yield Promo2_1.default.find();
        const dayProduct = dayProducts[0]; // Get the single item
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
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'product-images' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                }
                else {
                    dayProduct.image = cloudinaryResult.secure_url;
                    const updatedDayProduct = yield dayProduct.save();
                    res.status(200).json({
                        message: 'Product updated successfully',
                        product: updatedDayProduct,
                    });
                }
            }));
            if (!result) {
                throw new Error("Cloudinary upload failed");
            }
            streamifier_1.default.createReadStream(dimage.buffer).pipe(result);
        }
        else {
            res.status(404).send('Product not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updatePromo2 = updatePromo2;
