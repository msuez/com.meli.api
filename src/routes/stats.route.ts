
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
         *               type: object
         *               properties:
         *                 count_mutant_dna:
         *                   type: integer
         *                   description: Total number of mutant DNA sequences
         *                   example: 40
         *                 count_human_dna:
         *                   type: integer
         *                   description: Total number of human DNA sequences
         *                   example: 100
         *                 ratio:
         *                   type: number
         *                   format: float
         *                   description: Ratio of mutant to human DNA sequences
         *                   example: 0.4
         *               required:
         *                 - count_mutant_dna
         *                 - count_human_dna
         *                 - ratio
         */
        router.get('/', statsController.getDnaRatio);

        return router;
    }

}
