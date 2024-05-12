"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nativeProductsCrud_1 = require("../../controllers/products/nativeProductsCrud");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post("/native/products/add", upload.single('image'), nativeProductsCrud_1.addNativeProduct);
router.get("/native/products", nativeProductsCrud_1.getNativeProducts);
router.get("/native/products/:productId", nativeProductsCrud_1.getNativeProductById);
router.delete("/native/products/:productId", nativeProductsCrud_1.deleteNativeProduct);
router.put("/native/products/:productId", upload.single('image'), nativeProductsCrud_1.updateNativeProduct);
exports.default = router;
