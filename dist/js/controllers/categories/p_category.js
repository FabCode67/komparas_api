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
exports.addCategory_p = exports.getAllCategories_p = void 0;
const category_1 = __importDefault(require("../../models/category"));
const getAllCategories_p = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllCategories_p = getAllCategories_p;
const addCategory_p = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent_id } = req.body;
        const existingCategory = yield category_1.default.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: 'Category with the same name already exists' });
            return;
        }
        const category = new category_1.default({ name, parent_id });
        yield category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addCategory_p = addCategory_p;
