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
exports.getCustomer = exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = exports.addCustomer = void 0;
const customer_1 = __importDefault(require("../../models/customer"));
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const customer = new customer_1.default({
            name: body.name,
            age: body.age,
        });
        const newCustomer = yield customer.save();
        const allCustomers = yield customer_1.default.find({});
        res
            .status(201)
            .json({ message: "Customer added", customer: newCustomer, customers: allCustomers });
    }
    catch (error) {
        throw error;
    }
});
exports.addCustomer = addCustomer;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customer_1.default.find({});
        res.status(200).json({ customers });
    }
    catch (error) {
        throw error;
    }
});
exports.getCustomers = getCustomers;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateCustomer = yield customer_1.default.findByIdAndUpdate({ _id: id }, body);
        const allCustomers = yield customer_1.default.find({});
        res.status(200).json({
            message: "Customer updated",
            customer: updateCustomer,
            customers: allCustomers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCustomer = yield customer_1.default.findByIdAndRemove(req.params.id);
        const allCustomers = yield customer_1.default.find({});
        res.status(200).json({
            message: "Customer deleted",
            customer: deletedCustomer,
            customers: allCustomers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCustomer = deleteCustomer;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield customer_1.default.findById(req.params.id);
        res.status(200).json({
            message: "Customer found",
            customer: customer,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getCustomer = getCustomer;
