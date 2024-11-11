import { Request, Response, NextFunction } from 'express';

import { StatsService } from '../../src/services/stats.service';
import { StatsController } from '../../src/controllers/stats.controller';

jest.mock('../../src/services/stats.service');

describe('StatsController', () => {
    let statsService: StatsService;
    let statsController: StatsController;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        statsService = new StatsService();
        statsController = new StatsController(statsService);
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        next = jest.fn();
    });

    it('should get DNA stats successfully', async () => {
        const statsMock = {
            count_mutant_dna: 100,
            count_human_dna: 500,
            ratio: 0.2,
        };
        jest.spyOn(statsService, 'getDnaStats').mockResolvedValue(statsMock);

        await statsController.getDnaRatio(req, res, next);

        expect(statsService.getDnaStats).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(statsMock);
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and pass to next middleware', async () => {
        const error = new Error('Something went wrong');
        jest.spyOn(statsService, 'getDnaStats').mockRejectedValue(error);

        await statsController.getDnaRatio(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
