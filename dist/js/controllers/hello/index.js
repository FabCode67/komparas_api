"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHello = exports.getHello = void 0;
const hello_1 = __importDefault(require("../../models/hello"));
const getHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hello = yield hello_1.default.find().maxTimeMS(30000); // Set timeout to 30 seconds
        res.status(200).json({ hello });
    }
    catch (error) {
        throw error;
    }
});
exports.getHello = getHello;
const addHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const hello = new hello_1.default({
            hello: body.hello
        });
        const newHello = yield hello.save();
        const allHello = yield hello_1.default.find();
        res
            .status(201)
            .json({ message: "Hello added", hello: newHello, hellos: allHello });
    }
    catch (error) {
        throw error;
    }
});
exports.addHello = addHello;
