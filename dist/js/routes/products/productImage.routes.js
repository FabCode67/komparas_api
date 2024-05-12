"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productImages_1 = require("../../controllers/products/productImages");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/product_images/:product_id', upload.single('product_image'), productImages_1.addProductImage);
router.get('/product_images/:product_id', productImages_1.getProductImages);
router.put('/product_images/:product_id/:product_image_id', productImages_1.upDateProductImage);
exports.default = router;
