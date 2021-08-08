import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = String(req.headers.authorization);
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, config.tokenSecret);
        next();
    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
