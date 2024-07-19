"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DayPhoneSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Products',
    }
}, { timestamps: true });
const DayPhone = (0, mongoose_1.model)('DayPhone', DayPhoneSchema);
exports.default = DayPhone;
