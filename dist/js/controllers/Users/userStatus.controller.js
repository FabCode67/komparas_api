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
exports.enableUser = exports.disableUser = void 0;
const users_1 = __importDefault(require("../../models/users"));
const disableUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndUpdate(req.params.id, { status: "disabled" });
        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }
        if (user.status === "disabled") {
            res.status(401).json({
                status: false,
                message: "User already disabled"
            });
            return;
        }
        res.status(200).json({
            message: "Success",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving User" });
    }
});
exports.disableUser = disableUser;
const enableUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByIdAndUpdate(req.params.id, { status: "enabled" });
        if (!user) {
            res.status(401).json({
                status: false,
                message: "User not found"
            });
            return;
        }
        if (user.status === "enabled") {
            res.status(401).json({
                status: false,
                message: "User already enabled"
            });
            return;
        }
        res.status(200).json({
            message: "Success",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving User" });
    }
});
exports.enableUser = enableUser;
