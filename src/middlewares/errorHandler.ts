import { NextFunction, Request, Response } from "express";

import { CustomError } from '../errors/';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({
                statusCode: err.statusCode,
                message: err.message,
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
            });
        }
    } else {
        next();
    }
};