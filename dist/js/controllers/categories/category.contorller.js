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
exports.getAllCategoriesWithProducts = exports.getCategoryByName = exports.getCategoryById = exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getCategoryWithProducts = exports.getCategories = void 0;
const categories_1 = __importDefault(require("../../models/categories"));
const products_1 = __importDefault(require("../../models/products"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.default.find().maxTimeMS(3000);
        res.status(200).json({ categories });
    }
    catch (err) {
        throw err;
    }
});
exports.getCategories = getCategories;
const getCategoryWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const category = yield categories_1.default.findById(categoryId).maxTimeMS(3000);
        if (!category) {
            res.status(404).json({
                status: false,
                message: "Category not found",
            });
            return;
        }
        const products = yield products_1.default.find({ category: category._id }).maxTimeMS(3000);
        res.status(200).json({
            category,
            products,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching the category and its products",
        });
    }
});
exports.getCategoryWithProducts = getCategoryWithProducts;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.category_name || !body.category_description) {
            res.status(404).json({
                status: false,
                message: "please fill all fields"
            });
            return;
        }
        const existingCategory = yield categories_1.default.findOne({ category_name: body.category_name });
        if (existingCategory) {
            res.status(409).json({
                status: false,
                message: "category already exists"
            });
            return;
        }
        const newCategory = new categories_1.default({
            category_name: body.category_name,
            category_description: body.category_description,
        });
        const newCategories = yield newCategory.save();
        const allCategories = yield categories_1.default.find();
        res.status(200).json({
            message: "category added successfully",
            category: newCategories,
            categories: allCategories,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const existingCategory = yield categories_1.default.findOne({ category_name: body.category_name });
        if (existingCategory) {
            res.status(409).json({
                status: false,
                message: "category already exists"
            });
            return;
        }
        const updateCategory = yield categories_1.default.findByIdAndUpdate({ _id: id }, body);
        const allCategories = yield categories_1.default.find();
        res.status(200).json({
            message: "category updated",
            category: updateCategory,
            categories: allCategories,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating category" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield categories_1.default.findByIdAndRemove(req.params.id);
        const allCategories = yield categories_1.default.find();
        res.status(200).json({
            message: "category deleted",
            category: deletedCategory,
            categories: allCategories,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting category" });
    }
});
exports.deleteCategory = deleteCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_1.default.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            category: category,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.getCategoryById = getCategoryById;
const getCategoryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categories_1.default.findOne({ category_name: req.params.category_name });
        res.status(200).json({
            message: "Success",
            category: category,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.getCategoryByName = getCategoryByName;
const getAllCategoriesWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_1.default.find().maxTimeMS(3000);
        const categoriesWithProducts = [];
        for (const category of categories) {
            const categoryName = category.category_name;
            const foundCategory = yield categories_1.default.findOne({ category_name: categoryName });
            if (foundCategory) {
                const products = yield products_1.default.find({ category: foundCategory._id }).maxTimeMS(3000);
                categoriesWithProducts.push({
                    category: foundCategory,
                    products,
                });
            }
        }
        res.status(200).json(categoriesWithProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching categories with products",
        });
    }
});
exports.getAllCategoriesWithProducts = getAllCategoriesWithProducts;
