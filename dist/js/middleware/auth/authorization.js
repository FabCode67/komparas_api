"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminAuthenticat = exports.authenticat = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticat = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send('Access Denied');
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
exports.authenticat = authenticat;
const isAdminAuthenticat = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send('Access Denied');
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (verified.role === 'admin') {
            req.user = verified;
            next();
        }
        else {
            res.status(403).send({
                message: 'Permission Denied'
            });
        }
    }
    catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
exports.isAdminAuthenticat = isAdminAuthenticat;
