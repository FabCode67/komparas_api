"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobpplication_1 = __importDefault(require("../validation/jobpplication"));
const isaValidApplication = (req, res, next) => {
    const { error } = (0, jobpplication_1.default)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message.replace(/["\\]/g, '') });
    try {
        next();
    }
    catch (error) {
        throw error;
    }
};
exports.default = isaValidApplication;
