"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    image: { type: String },
    name: { type: String, required: true, unique: true },
    parent_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
}, { timestamps: true });
const Category = (0, mongoose_1.model)('Category', CategorySchema);
exports.default = Category;
