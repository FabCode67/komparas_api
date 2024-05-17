"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubsSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    token: { type: String, required: true }
}, { timestamps: true });
const Subs = (0, mongoose_1.model)('Subs', SubsSchema);
exports.default = Subs;
