"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jobApplicantSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    backgroundInfo: joi_1.default.string().required()
});
const validateApplication = (applicationData) => {
    return jobApplicantSchema.validate(applicationData);
};
exports.default = validateApplication;
