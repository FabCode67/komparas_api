import validateApplication from "../validation/jobpplication";
import { Request, Response, NextFunction } from 'express';

const isaValidApplication = (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateApplication(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message.replace(/["\\]/g, '') });
    try {
        next();
    } catch (error) {
        throw error;
    }
};

export default isaValidApplication;