"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicInfo_1 = __importDefault(require("./basicInfo"));
const server_1 = __importDefault(require("./server"));
const tags_1 = __importDefault(require("./tags"));
const component_1 = __importDefault(require("./component"));
const hello_1 = __importDefault(require("./hello"));
const users_1 = __importDefault(require("./users"));
const categories_1 = __importDefault(require("./categories"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo_1.default), server_1.default), tags_1.default), component_1.default), hello_1.default), categories_1.default), users_1.default);
