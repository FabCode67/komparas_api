"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nativeProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: false
    },
    quantity: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    our_review: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("NativeProducts", nativeProductSchema);
