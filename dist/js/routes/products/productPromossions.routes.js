"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productPromossions_1 = require("../../controllers/products/productPromossions");
const router = (0, express_1.Router)();
router.post('/product_promossion/:product_id', productPromossions_1.addProductPromossion);
router.put('/product_promossion/:product_id/:promossion_id', productPromossions_1.upadateProductPromossion);
router.delete('/product_promossion/:product_id/:promossion_id', productPromossions_1.deleteProductImage);
exports.default = router;
