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
exports.deleteProductFromComparison = exports.getProductComparisonByUser = exports.getAllInfoOFProductsOnComparison = exports.getProductComparison = exports.addProductToComparison = void 0;
const comparision_1 = __importDefault(require("../../models/comparision"));
const products_1 = __importDefault(require("../../models/products"));
const addProductToComparison = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const comparison = new comparision_1.default({
            userId: body.userId,
            productId: body.productId,
        });
        const newComparison = yield comparison.save();
        res
            .status(201)
            .json({ message: "Product added to comparison", comparison: newComparison });
    }
    catch (error) {
        throw error;
    }
});
exports.addProductToComparison = addProductToComparison;
const getProductComparison = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comparisons = yield comparision_1.default.find({});
        const comparisionProductsId = comparisons.map((comparison) => comparison.productId);
        const productsInfo = yield products_1.default.find({ _id: { $in: comparisionProductsId } });
        res.status(200).json({ comparisons, productsInfo });
    }
    catch (error) {
        throw error;
    }
});
exports.getProductComparison = getProductComparison;
const getAllInfoOFProductsOnComparison = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comparisons = yield comparision_1.default.find({});
        const productsInfo = yield products_1.default.find({});
        res.status(200).json({ comparisons, productsInfo });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllInfoOFProductsOnComparison = getAllInfoOFProductsOnComparison;
const getProductComparisonByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, } = req;
        const comparisons = yield comparision_1.default.find({ userId: userId });
        const comparisionProductsId = comparisons.map((comparison) => comparison.productId);
        const productsInfo = yield products_1.default.find({ _id: { $in: comparisionProductsId } });
        res.status(200).json({ comparisons, productsInfo });
    }
    catch (error) {
        throw error;
    }
});
exports.getProductComparisonByUser = getProductComparisonByUser;
const deleteProductFromComparison = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, } = req;
        const deleteComparison = yield comparision_1.default.findByIdAndDelete({ _id: id });
        const allComparisons = yield comparision_1.default.find({});
        res.status(200).json({
            message: "Product deleted from comparison",
            comparison: deleteComparison,
            comparisons: allComparisons,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteProductFromComparison = deleteProductFromComparison;
