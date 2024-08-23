"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobApplicant_1 = require("../../controllers/jobApplicant");
const validApllication_1 = __importDefault(require("../../middleware/validApllication"));
const applicationRouter = express_1.default.Router();
applicationRouter.post('/job-applications', validApllication_1.default, jobApplicant_1.sendJobApplication);
applicationRouter.get('/job-applications', jobApplicant_1.getJobApplications);
applicationRouter.get('/job-applications/:id', jobApplicant_1.getJobApplicationById);
exports.default = applicationRouter;
