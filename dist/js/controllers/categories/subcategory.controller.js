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
exports.getSubcategoryWithCategoryName = exports.getSubcategoryWithCategory = exports.getSubcategoryWithProducts = exports.getSubCategoryByDescription = exports.getSubCategoryByName = exports.getSubCategoryByCategory = exports.getSubCategoryById = exports.deleteSubCategory = exports.updateSubCategory = exports.addSubCategory = exports.getAllSubCategories = void 0;
const subcategories_1 = __importDefault(require("../../models/subcategories"));
const categories_1 = __importDefault(require("../../models/categories"));
const products_1 = __importDefault(require("../../models/products"));
const getAllSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield subcategories_1.default.find().maxTimeMS(30000);
        res.status(200).json({ categories });
    }
    catch (err) {
        throw err;
    }
});
exports.getAllSubCategories = getAllSubCategories;
const addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.subcategory_name || !body.category_name || !body.subcategory_description) {
            res.status(400).json({
                status: false,
                message: 'Please fill all required fields',
            });
            return;
        }
        const category = yield categories_1.default.findOne({ category_name: body.category_name });
        if (!category) {
            res.status(404).json({
                status: false,
                message: 'Category not found',
            });
            return;
        }
        const newSubcategory = new subcategories_1.default({
            subcategory_name: body.subcategory_name,
            subcategory_description: body.subcategory_description,
            category: category._id,
        });
        const newSubcategoryResult = yield newSubcategory.save();
        res.status(201).json({
            message: 'Subcategory added successfully',
            subcategory: newSubcategoryResult,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the subcategory',
        });
    }
});
exports.addSubCategory = addSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const existingSubcategory = yield subcategories_1.default.findOne({ subcategory_name: body.subcategory_name });
        if (existingSubcategory) {
            res.status(409).json({
                status: false,
                message: "subcategory already exists"
            });
            return;
        }
        const updatedSubcategory = yield subcategories_1.default.findByIdAndUpdate({ _id: id }, body);
        const allSubcategories = yield subcategories_1.default.find();
        res.status(200).json({
            message: "Subcategory updated",
            subcategory: updatedSubcategory,
            subcategories: allSubcategories,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating subcategory" });
    }
});
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategoryId = req.params.subcategoryId;
        const deletedSubcategory = yield subcategories_1.default.findByIdAndDelete(subcategoryId);
        if (!deletedSubcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Subcategory deleted successfully',
            subcategory: deletedSubcategory,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while deleting the subcategory',
        });
    }
});
exports.deleteSubCategory = deleteSubCategory;
const getSubCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findById(req.params.subcategoryId);
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" });
    }
});
exports.getSubCategoryById = getSubCategoryById;
const getSubCategoryByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findOne({ category: req.params.categoryId });
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" });
    }
});
exports.getSubCategoryByCategory = getSubCategoryByCategory;
const getSubCategoryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findOne({ subcategory_name: req.params.subcategory_name });
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" });
    }
});
exports.getSubCategoryByName = getSubCategoryByName;
const getSubCategoryByDescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findOne({ subcategory_description: req.params.subcategory_description });
        res.status(200).json({
            message: "Success",
            subcategory: subcategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving subcategory" });
    }
});
exports.getSubCategoryByDescription = getSubCategoryByDescription;
const getSubcategoryWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategoryId = req.params.subcategoryId;
        const subcategory = yield subcategories_1.default.findById(subcategoryId).maxTimeMS(3000);
        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }
        const products = yield products_1.default.find({ subcategory: subcategory._id }).maxTimeMS(3000);
        res.status(200).json({
            subcategory,
            products,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with products',
        });
    }
});
exports.getSubcategoryWithProducts = getSubcategoryWithProducts;
const getSubcategoryWithCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findById(req.params.subcategoryId).maxTimeMS(3000);
        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }
        const category = yield subcategories_1.default.find({ subcategory: subcategory._id }).maxTimeMS(3000);
        res.status(200).json({
            subcategory,
            category,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with category',
        });
    }
});
exports.getSubcategoryWithCategory = getSubcategoryWithCategory;
const getSubcategoryWithCategoryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategories_1.default.findById(req.params.subcategoryId).maxTimeMS(3000);
        if (!subcategory) {
            res.status(404).json({
                status: false,
                message: 'Subcategory not found',
            });
            return;
        }
        const category = yield subcategories_1.default.find({ subcategory: subcategory._id }).maxTimeMS(3000);
        res.status(200).json({
            subcategory,
            category,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'An error occurred while fetching subcategory with category',
        });
    }
});
exports.getSubcategoryWithCategoryName = getSubcategoryWithCategoryName;
