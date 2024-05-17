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
exports.upadateProductPromossion = exports.deleteProductImage = exports.addProductPromossion = void 0;
const ProductPromossions_1 = __importDefault(require("../../models/ProductPromossions"));
;
const addProductPromossion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const newProductImage = new ProductPromossions_1.default({
            product: product_id,
            product_promossion: req.body.product_promossion
        });
        res.status(201).json({ message: 'Product Promossion added successfully', productPromossion: yield newProductImage.save() });
    }
    catch (err) {
    }
});
exports.addProductPromossion = addProductPromossion;
const deleteProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, promossion_id } = req.params;
        if (!product_id || !promossion_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and product_image_id',
            });
            return;
        }
        const deletedProductImage = yield ProductPromossions_1.default.findByIdAndDelete(promossion_id);
        res.status(200).json({
            message: 'Product promossion deleted successfully',
            productImage: deletedProductImage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the product promossion',
        });
    }
});
exports.deleteProductImage = deleteProductImage;
const upadateProductPromossion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, promossion_id } = req.params;
        if (!product_id || !promossion_id) {
            res.status(400).json({
                status: false,
                message: 'Please provide product_id and promossion_id',
            });
            return;
        }
        const updatedProductImage = yield ProductPromossions_1.default.findByIdAndUpdate(promossion_id, req.body, { new: true });
        res.status(200).json({
            message: 'Product promossion updated successfully',
            productImage: updatedProductImage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while updating the product promossion',
        });
    }
});
exports.upadateProductPromossion = upadateProductPromossion;
