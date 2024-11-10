import { 
    Handler,
    Request,
    Response,
    NextFunction,
} from 'express';

import { ForbiddenError } from '../errors';
import dnaModel from '../models/dna.model';
import { isMutant, } from '../helpers/dna.helper';

export class MutantsController {

    public registerDna: Handler = async(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {

            const { dna } = req.body;
            const mutant:boolean = isMutant(dna);

            await dnaModel.create({
                dna,
                isMutant: mutant,
            });

            if(!mutant) {
                throw new ForbiddenError('Is a human');
            }

            res.status(200).json({
                message: `Is a mutant`,
            });

        } catch (error) {
            next(error);
        }
    }

}
