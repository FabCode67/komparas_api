"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../../controllers/categories/category");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post("/category/add", upload.single('image'), category_1.addCategory);
router.get("/categories/all", category_1.getAllCategories);
router.get("/categories/parents", category_1.getParentCategories);
router.delete("/categories/:category_id", category_1.deleteCategory);
router.get("/categories/:category", category_1.getCategoryByNameOrID);
router.put("/categories/:category_id", upload.single('image'), category_1.updateCategory);
exports.default = router;
