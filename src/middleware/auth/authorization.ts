import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: any; 
}

export const authenticat = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string );
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}



// export const authenticat = (req, res, next) => {
//     try {
//       const token = req.headers.authorization;
//       const decoded = jwt.verify(token, secretKey);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).send({ status: "fail", message: "Unauthorized" });
//     }
//   };