"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
}, { timestamps: true });
const Customer = (0, mongoose_1.model)('Customer', CustomerSchema);
exports.default = Customer;
