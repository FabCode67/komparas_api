"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddCategory_1 = __importDefault(require("./AddCategory"));
const GetAllCategories_1 = __importDefault(require("./GetAllCategories"));
exports.default = {
    paths: {
        '/category/add': Object.assign({}, AddCategory_1.default),
        '/categories/all': Object.assign({}, GetAllCategories_1.default),
    },
};
