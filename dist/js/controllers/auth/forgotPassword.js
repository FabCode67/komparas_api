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
exports.resetPassword = exports.forgotPassword = void 0;
const users_1 = __importDefault(require("../../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ status: false, message: 'Email is required' });
    }
    try {
        const existingEmail = yield users_1.default.findOne({ email });
        if (!existingEmail) {
            return res.status(404).json({ status: false, message: 'Email not found' });
        }
        const resetToken = (0, uuid_1.v4)();
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        yield users_1.default.updateOne({ _id: existingEmail._id }, { resetToken, resetTokenExpiry });
        const confirmUrl = `https://curious-kitten-7438aa.netlify.app?resetToken=${resetToken}`;
        const mailOptions = {
            from: 'mwanafunzifabrice@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `
            <p>Click the link below to reset your password</p>
            <a href="${confirmUrl}">${confirmUrl}</a>
        `,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ status: true, message: 'Password reset email sent successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'An error occurred while sending the email' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken, password, confirmPassword } = req.body;
    if (!resetToken || !password || !confirmPassword) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ status: false, message: 'Passwords do not match' });
    }
    try {
        const user = yield users_1.default.findOne({ resetToken });
        if (!user) {
            return res.status(404).json({ status: false, message: 'Invalid reset token' });
        }
        const userWithExpiry = user;
        if (Date.now() > userWithExpiry.resetTokenExpiry) {
            return res.status(400).json({ status: false, message: 'Reset token has expired' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield users_1.default.updateOne({ _id: user._id }, { password: hashedPassword, resetToken: null, resetTokenExpiry: null });
        res.status(200).json({ status: true, message: 'Password reset successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'An error occurred while resetting the password' });
    }
});
exports.resetPassword = resetPassword;
