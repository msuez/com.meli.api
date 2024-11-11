import { CustomError, ForbiddenError, } from '../../src/errors';

describe('CustomError', () => {
    it('should create an error with a default status code of 400', () => {
        const errorMessage = 'This is a custom error';
        const error = new CustomError(errorMessage);

        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(400);
    });

    it('should create an error with a specific status code', () => {
        const errorMessage = 'This is a custom error with a specific status code';
        const statusCode = 404;
        const error = new CustomError(errorMessage, statusCode);

        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(statusCode);
    });
});

describe('ForbiddenError', () => {
    it('should create a ForbiddenError with status code 403', () => {
        const errorMessage = 'Access denied';
        const error = new ForbiddenError(errorMessage);

        expect(error).toBeInstanceOf(ForbiddenError);
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(403);
    });
});
