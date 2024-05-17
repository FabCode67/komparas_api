"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_1 = require("../../controllers/shop/shop");
const router = express_1.default.Router();
router.get('/shops', shop_1.getAllShops);
router.get('/shops/:id', shop_1.getShopById);
router.post('/shops/add', shop_1.addShop);
router.put('/shops/:id', shop_1.updateShop);
router.delete('/shops/:id', shop_1.deleteShop);
exports.default = router;
