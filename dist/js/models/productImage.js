"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productImageSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    product_image: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('ProductImages', productImageSchema);
