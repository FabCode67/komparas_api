import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    user?: any; 
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log('authHeader:', authHeader); // Debug log for header

    // Check if there is an Authorization header
    if (!authHeader) return next(); // If no auth header, proceed (non-authenticated user)

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
        req.user = verified;  // Attach user info to the request if verified
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};
