import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { log } from 'console';

interface AuthRequest extends Request {
    user?: any; 
}
interface JwtPayload {
    _id: string; 
    role: string; 
}

export const authenticat = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send('Access Denied');

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({message:'Invalid Token'});
    }
};

export const isAdminAuthenticat = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access Denied');
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        if (verified.role === 'admin') {
            req.user = verified;
            next();
        } else {
            res.status(403).send({
                message:'Permission Denied'
            });
        }
    } catch (err) {
        res.status(400).send({message:'Invalid Token'});
    }
};
