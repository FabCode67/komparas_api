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
exports.deleteShop = exports.getShopById = exports.getAllShops = exports.updateShop = exports.addShop = void 0;
const shop_1 = __importDefault(require("../../models/shop"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const addShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const shop = new shop_1.default(req.body);
        const image = req.file;
        if (!image) {
            res.status(400).json({
                status: false,
                message: 'Please upload a Logo file',
            });
            return;
        }
        const working_hours = (_a = req.body.working_hours) === null || _a === void 0 ? void 0 : _a.map((spec) => {
            var _a, _b;
            return ({
                day: (_a = spec === null || spec === void 0 ? void 0 : spec.day) === null || _a === void 0 ? void 0 : _a.toString(),
                time_range: (_b = spec === null || spec === void 0 ? void 0 : spec.time_range) === null || _b === void 0 ? void 0 : _b.toString(),
            });
        });
        shop.working_hours = working_hours;
        const existingShop = yield shop_1.default.findOne({ name: shop.name });
        if (existingShop) {
            res.status(400).json({ message: 'Shop with the same name already exists' });
            return;
        }
        const existingEmail = yield shop_1.default.findOne({ email: shop.email });
        if (existingEmail) {
            res.status(400).json({ message: 'Shop with the same email already exists' });
            return;
        }
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'image' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: 'Something went wrong',
                });
            }
            shop.image = cloudinaryResult.secure_url;
            // add auto incriment shop number
            shop.shop_number = Math.floor(Math.random() * 1000000);
            // check if the shop number already exists
            const existingShopNumber = yield shop_1.default.findOne({ shop_number: shop.shop_number });
            if (existingShopNumber) {
                shop.shop_number = Math.floor(Math.random() * 1000000);
            }
            const newShop = yield shop.save();
            res.status(201).json(newShop);
        }));
        streamifier_1.default.createReadStream(image.buffer).pipe(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.addShop = addShop;
const updateShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const shop = yield shop_1.default.findById(req.params.id);
        if (!shop) {
            res.status(404).json({ message: 'Shop not found' });
            return;
        }
        const image = req.file;
        const working_hours = (_b = req.body.working_hours) === null || _b === void 0 ? void 0 : _b.map((spec) => {
            var _a, _b;
            return ({
                day: (_a = spec === null || spec === void 0 ? void 0 : spec.day) === null || _a === void 0 ? void 0 : _a.toString(),
                time_range: (_b = spec === null || spec === void 0 ? void 0 : spec.time_range) === null || _b === void 0 ? void 0 : _b.toString(),
            });
        });
        shop.name = req.body.name || shop.name;
        shop.owner = req.body.owner || shop.owner;
        shop.location = req.body.location || shop.location;
        shop.working_hours = working_hours.length ? working_hours : shop.working_hours;
        shop.phone = req.body.phone || shop.phone;
        shop.email = req.body.email || shop.email;
        shop.location_discription = req.body.location_discription || shop.location_discription;
        shop.description = req.body.description || shop.description;
        // check if the shop has a shop number if not generate one
        if (!shop.shop_number) {
            shop.shop_number = Math.floor(Math.random() * 1000000);
        }
        // check if the shop number already exists
        const existingShopNumber = yield shop_1.default.findOne({ shop_number: shop.shop_number });
        if (existingShopNumber) {
            shop.shop_number = Math.floor(Math.random() * 1000000);
        }
        if (image) {
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'image' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'Something went wrong',
                    });
                }
                shop.image = cloudinaryResult.secure_url;
                const updatedShop = yield shop.save();
                res.status(200).json(updatedShop);
            }));
            streamifier_1.default.createReadStream(image.buffer).pipe(result);
        }
        else {
            const updatedShop = yield shop.save();
            res.status(200).json(updatedShop);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateShop = updateShop;
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
