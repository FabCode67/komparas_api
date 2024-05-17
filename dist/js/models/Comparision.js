"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ComparisonSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
}, { timestamps: true });
const Comparison = (0, mongoose_1.model)("Comparison", ComparisonSchema);
exports.default = Comparison;
