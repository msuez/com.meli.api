
import {
    Router,
} from 'express';

import { StatsService } from '../services/stats.service';
import { StatsController } from '../controllers/stats.controller';

export class StatsRoutes {

    static get routes():Router {

        const router = Router();
        const statsService = new StatsService();
        const statsController = new StatsController(statsService);

        /**
         * @swagger
         * /stats:
         *   get:
         *     summary: Mutant DNA Ratio Stats
         *     description: Get the ratio of mutant DNA sequences to human DNA sequences.
         *     operationId: getStats
         *     tags: 
         *       - Stats
         *     responses:
         *       200:
         *         description: Successful response
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/StatsResponse'
         */
        router.get('/', statsController.getDnaRatio);

        return router;
    }

}
