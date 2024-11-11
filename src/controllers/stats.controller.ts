import { 
    Handler,
    Request,
    Response,
    NextFunction,
} from 'express';

import { StatsService } from '../services/stats.service';

export class StatsController {

    private statsService: StatsService;

    constructor(statsService: StatsService) {
        this.statsService = statsService;
    }

    public getDnaRatio: Handler = async(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {

            const stats = await this.statsService.getDnaStats();

            res.status(200).json(stats);

        } catch (error) {
            next(error);
        }
    }

}
