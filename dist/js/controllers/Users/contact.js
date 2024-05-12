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
exports.updateMessage = exports.deleteMessage = exports.getMessages = exports.sendMessage = void 0;
const contact_1 = __importDefault(require("../../models/contact"));
const sensitiveWords = ['iiiddd', 'jjdjdd', 'dkcmkdk', 'jewvd', 'hhh'];
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        const containsSensitiveContent = sensitiveWords.some(word => message.includes(word));
        if (containsSensitiveContent) {
            return res.status(400).json({ message: 'Votre message contient un langage insensible.' });
        }
        const contact = new contact_1.default({ name, email, message });
        yield contact.save();
        res.status(201).json({ message: 'Votre message a bien été reçu ; nous vous répondrons bientôt.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
});
exports.sendMessage = sendMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield contact_1.default.find();
        res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
});
exports.getMessages = getMessages;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield contact_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Message supprimé avec succès.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
});
exports.deleteMessage = deleteMessage;
const updateMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;
        const containsSensitiveContent = sensitiveWords.some(word => message.includes(word));
        if (containsSensitiveContent) {
            return res.status(400).json({ message: 'Votre message contient un langage insensible.' });
        }
        yield contact_1.default.findByIdAndUpdate(id, { name, email, message });
        res.status(200).json({ message: 'Message mis à jour avec succès.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Oops! essayer à nouveau!' });
    }
});
exports.updateMessage = updateMessage;
