"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    confirm_password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        defaultValue: "buyer",
        required: false
    },
    status: {
        type: String,
        defaultValue: "enabled",
        required: false,
    },
    profile_picture: {
        type: String,
        required: false
    },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpiry: {
        type: Number,
        default: null,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Users", userSchema);
