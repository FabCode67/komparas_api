"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getHello_1 = __importDefault(require("./getHello"));
const postHello_1 = __importDefault(require("./postHello"));
exports.default = {
    paths: {
        '/hello': Object.assign(Object.assign({}, getHello_1.default), postHello_1.default),
    },
};
