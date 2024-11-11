import { Request, Response, NextFunction } from 'express';
import * as expressValidator from 'express-validator';

import { validateFields } from '../../src/middlewares/validate-fields';

jest.mock('express-validator', () => ({
    validationResult: jest.fn(),
}));

describe('Validate Fields Middleware', () => {
    it('should return 400 and a validation error message when validation fails', () => {
        const errors = {
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([
                { path: 'field1', msg: 'is required' },
                { path: 'field2', msg: 'must be a number' },
            ]),
        };

        (expressValidator.validationResult as any).mockReturnValue(errors);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        validateFields(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Validation failed: field1 is required, field2 must be a number',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next() when there are no validation errors', () => {
        const errors = {
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn().mockReturnValue([]),
        };

        (expressValidator.validationResult as any).mockReturnValue(errors);

        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        validateFields(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 500 when an error occurs', () => {
        (expressValidator.validationResult as any).mockImplementation(() => {
            throw new Error('Some unexpected error');
        });

        const req = {} as Request;
        const res = {
            sendStatus: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        validateFields(req, res, next);

        expect(res.sendStatus).toHaveBeenCalledWith(500);
        expect(next).not.toHaveBeenCalled();
    });
});
