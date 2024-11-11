import { Request, Response, NextFunction } from 'express';
import { MutantsController } from '../../src/controllers/mutants.controller';
import { MutantService } from '../../src/services/mutant.service';
import { ForbiddenError } from '../../src/errors';
import { isMutant } from '../../src/helpers/dna.helper';

jest.mock('../../src/helpers/dna.helper');
jest.mock('../../src/services/mutant.service');

describe('MutantsController', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let mutantService: MutantService;
    let mutantsController: MutantsController;

    beforeEach(() => {
        mutantService = new MutantService();
        mutantsController = new MutantsController(mutantService);
        req = {
            body: { dna: ['ATCGGA', 'TTCGGA', 'ATTATT', 'AGATGG', 'CGCTCA', 'TCATTT'] },
        } as unknown as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        next = jest.fn();
    });

    it('should register DNA for a mutant', async () => {
        (isMutant as jest.Mock).mockReturnValue(true);
        const saveDnaMock = jest.spyOn(mutantService, 'saveDna').mockResolvedValue();

        await mutantsController.registerDna(req, res, next);

        expect(saveDnaMock).toHaveBeenCalledWith(req.body.dna, true);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Is a mutant' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should throw ForbiddenError for human DNA', async () => {
        (isMutant as jest.Mock).mockReturnValue(false);
        const saveDnaMock = jest.spyOn(mutantService, 'saveDna').mockResolvedValue();

        await mutantsController.registerDna(req, res, next);

        expect(saveDnaMock).toHaveBeenCalledWith(req.body.dna, false);
        expect(next).toHaveBeenCalledWith(new ForbiddenError('Is a human'));
    });

    it('should handle errors and pass to the next middleware', async () => {
        const error = new Error('Something went wrong');
        (isMutant as jest.Mock).mockReturnValue(true);
        jest.spyOn(mutantService, 'saveDna').mockRejectedValue(error);

        await mutantsController.registerDna(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
