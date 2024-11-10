import { 
    Handler,
    Request,
    Response,
    NextFunction,
} from 'express';

export class MutantsController {

    public registerDna: Handler = async(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {

            res.status(200).json({
                message: `Pong`,
                status: `Success`,
            });

        } catch (error) {
            next(error);
        }
    }

}
