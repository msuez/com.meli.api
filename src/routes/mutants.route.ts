
import {
    Router,
} from 'express';
import { check } from 'express-validator';

import { MutantsController } from '../controllers/mutants.controller';
import { validateFields } from '../middlewares/validate-fields';

export class MutantsRoutes {

    static get routes():Router {

        const router = Router();
        const mutantsController = new MutantsController();

        /**
         * @swagger
         * /mutant:
         *   post:
         *     summary: Detect Mutant DNA
         *     description: Detects if a DNA sequence belongs to a mutant
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               dna:
         *                 type: array
         *                 items:
         *                   type: string
         *     responses:
         *       200:
         *         description: Mutant detected
         *       403:
         *         description: Human detected
         *       400:
         *         description: Invalid DNA format
         */
        router.post('/', [

            check('dna')
                .isArray()
                .withMessage('must be an array of strings'),

            check('dna.*')
                .isString()
                .matches(/^[ATCG]+$/)
                .withMessage('Each DNA sequence must contain only A, T, C, G'),
            
            validateFields,
        ], mutantsController.registerDna);

        return router;
    }

}
