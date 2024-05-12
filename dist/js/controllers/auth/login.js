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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../models/users"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.email || !body.password) {
            res.status(401).json({
                status: false,
                message: 'Please fill all fields',
            });
            return;
        }
        const user = yield users_1.default.findOne({ email: body.email });
        if (!user || !user.password) {
            res.status(401).json({
                status: false,
                message: 'Invalid credentials',
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(body.password, user.password);
        if (!passwordMatch) {
            res.status(401).json({
                status: false,
                message: 'Invalid credentials',
            });
            return;
        }
        const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            profile_picture: user.profile_picture,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).header('Authorization', `Bearer ${token}`).json({
            status: true,
            message: 'Login successful',
            token,
            user,
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            status: false,
            message: 'An error occurred during login',
        });
    }
});
exports.login = login;
