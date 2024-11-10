
import {
    Router,
    Request,
    Response,
} from 'express';

import { StatsController } from '../controllers/stats.controller';

export class StatsRoutes {

    static get routes():Router {

        const router = Router();
        const statsController = new StatsController();

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
         *                 message:
         *                   type: string
         *                   example: Pong
         *                 status:
         *                   type: string
         *                   example: Success
         */
        router.get('/', statsController.getDnaRatio);

        return router;
    }

}
