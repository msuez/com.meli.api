import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../../src/errors';
import { errorHandler } from '../../src/middlewares/errorHandler';

describe('Error Handler Middleware', () => {
    it('should return the correct status code and message for a CustomError', () => {
        const customError = new CustomError('Bad Request', 400);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        errorHandler(customError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 400,
            message: 'Bad Request',
        });
    });

    it('should return 500 and "Internal Server Error" for a generic error', () => {
        const genericError = new Error('Something went wrong');
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        errorHandler(genericError, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    });

    it('should call next function if no error is passed', () => {
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();

        errorHandler(null as any, req, res, next);

        expect(next).toHaveBeenCalled();
    });
});
