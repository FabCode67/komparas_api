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
exports.getUserByEmail = exports.getUserById = exports.deleteUser = exports.updateUser = exports.getUsers = exports.addUser = void 0;
const users_1 = __importDefault(require("../../models/users"));
const emailValidity_1 = require("../../middleware/emailValidity");
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password, confirm_password } = req.body;
        const imageFile = req.file;
        // Check if at least one of the required fields is present
        if (!first_name || !last_name || !email || !password || !confirm_password) {
            res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
            return;
        }
        if (!(0, emailValidity_1.isValidEmail)(email)) {
            res.status(400).json({
                status: false,
                message: "Invalid email address",
            });
            return;
        }
        if (password !== confirm_password) {
            res.status(400).json({
                status: false,
                message: "Passwords do not match",
            });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({
                status: false,
                message: "Password must be at least 8 characters long",
            });
            return;
        }
        // Check if user with the same email already exists
        const existingUser = yield users_1.default.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({
                status: false,
                message: "User with this email already exists",
            });
            return;
        }
        // If an image file is provided, handle the upload
        if (imageFile) {
            const result = cloudinary_1.v2.uploader.upload_stream({ folder: 'product-image' }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error(error);
                    res.status(500).json({
                        status: false,
                        message: 'An error occurred while uploading the image to Cloudinary',
                    });
                }
                else {
                    // Rest of your code for validation and user creation with profile picture
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const newUser = new users_1.default({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: hashedPassword,
                        confirm_password: confirm_password,
                        role: 'buyer',
                        status: "enabled",
                        profile_picture: cloudinaryResult.secure_url,
                    });
                    const savedUser = yield newUser.save();
                    res.status(201).json({
                        message: 'User added successfully',
                        user: savedUser,
                    });
                }
            }));
            if (!result) {
                throw new Error("Cloudinary upload failed");
            }
            streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
        }
        else {
            // If no image file is provided, create user without profile picture
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new users_1.default({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                confirm_password: confirm_password,
                role: 'buyer',
                status: "enabled",
            });
            const savedUser = yield newUser.save();
            res.status(201).json({
                message: 'User added successfully',
                user: savedUser,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred while adding the user',
        });
    }
});
exports.addUser = addUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find().maxTimeMS(30000);
        res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateUsers = yield users_1.default.findByIdAndUpdate({ _id: id }, body);
        const allUsers = yield users_1.default.find();
        res.status(200).json({
            message: "Users updated",
            users: updateUsers,
            userss: allUsers,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating Users" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUsers = yield users_1.default.findByIdAndRemove(req.params.id);
        const allUsers = yield users_1.default.find();
        res.status(200).json({
            message: "Users deleted",
            users: deletedUsers,
            userss: allUsers,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting Users" });
    }
});
exports.deleteUser = deleteUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving User" });
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findOne({ email: req.params.email });
        res.status(200).json({
            message: "Success",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving User" });
    }
});
exports.getUserByEmail = getUserByEmail;
