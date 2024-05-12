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
exports.deleteShop = exports.updateShop = exports.addShop = exports.getShopById = exports.getAllShops = void 0;
const shop_1 = __importDefault(require("../../models/shop"));
// Get all shops
const getAllShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shops = yield shop_1.default.find();
        res.status(200).json(shops);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getAllShops = getAllShops;
// Get a single shop by ID
const getShopById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = yield shop_1.default.findById(req.params.id);
        if (shop) {
            res.status(200).json(shop);
        }
        else {
            res.status(404).send('Shop not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getShopById = getShopById;
// Add a new shop
const addShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = new shop_1.default(req.body);
        // check if shop with the same name already exists
        const existingShop = yield shop_1.default.findOne({ name: shop.name });
        if (existingShop) {
            res.status(400).json({ message: 'Shop with the same name already exists' });
            return;
        }
        // check if shop with the same email already exists
        const existingEmail = yield shop_1.default.findOne({ email: shop.email });
        if (existingEmail) {
            res.status(400).json({ message: 'Shop with the same email already exists' });
            return;
        }
        const newShop = yield shop.save();
        res.status(201).json(newShop);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addShop = addShop;
// Update an existing shop by ID
const updateShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = yield shop_1.default.findById(req.params.id);
        if (shop) {
            shop.name = req.body.name;
            shop.location = req.body.location;
            shop.working_hours = req.body.working_hours;
            shop.phone = req.body.phone;
            shop.email = req.body.email;
            shop.description = req.body.description;
            const updatedShop = yield shop.save();
            res.status(200).json(updatedShop);
        }
        else {
            res.status(404).send('Shop not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateShop = updateShop;
// Delete a shop by ID
const deleteShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedShop = yield shop_1.default.findByIdAndDelete(req.params.id);
        if (deletedShop) {
            res.status(200).json(deletedShop);
        }
        else {
            res.status(404).send('Shop not found');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deleteShop = deleteShop;
