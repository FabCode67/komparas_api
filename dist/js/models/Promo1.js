"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Promo1Schema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    offer: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });
const Promo1 = (0, mongoose_1.model)('Promo1', Promo1Schema);
exports.default = Promo1;
