"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const KomparasCodeSchema = new mongoose_1.Schema({
    fullName: { type: String },
    phoneNumberOrEmail: { type: String },
    checkbox1: { type: Boolean },
    checkbox2: { type: Boolean },
    checkbox3: { type: Boolean },
    contactMethod: { type: String },
    komparasCode: { type: String },
    shopId: { type: String },
    shopName: { type: String },
    product_id: { type: String },
    sold_confirm: { type: Boolean, default: false },
}, { timestamps: true });
const KomparasCode = (0, mongoose_1.model)('KomparasCode', KomparasCodeSchema);
exports.default = KomparasCode;
