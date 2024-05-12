"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    vendors: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Shop',
            required: true,
        }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    product_specifications: [{
            key: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
        }],
    our_review: [{
            key: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            },
        }],
    availableStorages: [{
            value: {
                type: String,
                required: true,
            },
        }],
    vendor_prices: [{
            vendor_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Shop',
                required: true,
            },
            vendor_name: {
                type: String,
                ref: 'Shop',
            },
            price: {
                type: Number,
                required: true,
            },
            colors: [{
                    type: String,
                    required: true,
                }],
        }],
    our_price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Products', productSchema);
