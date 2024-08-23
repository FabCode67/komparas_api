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
exports.getJobApplicationById = exports.getJobApplications = exports.sendJobApplication = void 0;
const jobApplicant_1 = __importDefault(require("../models/jobApplicant"));
const sendJobApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phone, backgroundInfo } = req.body;
        const jobApplication = new jobApplicant_1.default({
            fullName,
            email,
            phone,
            backgroundInfo
        });
        yield jobApplication.save();
        res.status(201).json({ message: "Gusaba akazi byakozwe neza", data: jobApplication });
    }
    catch (error) {
        throw error;
    }
});
exports.sendJobApplication = sendJobApplication;
const getJobApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobApplications = yield jobApplicant_1.default.find();
        res.status(200).json({ message: 'Abasabye akazi', data: jobApplications });
    }
    catch (error) {
        throw error;
    }
});
exports.getJobApplications = getJobApplications;
const getJobApplicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const jobApplication = yield jobApplicant_1.default.findById({ _id: id });
        if (!jobApplication) {
            res.status(404).json({ message: 'Page musabye ntayihari, mwongere mugerageze!' });
        }
        res.status(200).json({ message: 'Soma birambuye', data: jobApplication });
    }
    catch (error) {
        throw error;
    }
});
exports.getJobApplicationById = getJobApplicationById;
