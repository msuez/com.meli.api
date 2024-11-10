import {
    Request,
    Response,
    NextFunction,
} from 'express';

import {
    validationResult,
} from 'express-validator';

export const validateFields = (req: Request, res: Response, next:NextFunction): void => {
    try {
        const errors = validationResult( req );

        if( !errors.isEmpty() ) {
            const errorMessage = errors
                .array()
                .map((err: any) => `${err.path} ${err.msg}`)
                .join(', ');
            res.status(400).json({
                message: `Validation failed: ${errorMessage}`,
            });
            return;
        }

        next();

    } catch (error) {
        res.sendStatus(500);
    }
}