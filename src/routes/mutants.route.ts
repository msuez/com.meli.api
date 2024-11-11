
import {
    Router,
} from 'express';
import { check } from 'express-validator';

import { MutantService } from '../services/mutant.service';
import { MutantsController } from '../controllers/mutants.controller';
import { validateFields } from '../middlewares/validate-fields';

export class MutantsRoutes {

    static get routes():Router {

        const router = Router();
        const mutantService = new MutantService(); 
        const mutantsController = new MutantsController( mutantService );

        /**
         * @swagger
         * /mutant:
         *   post:
         *     summary: Detect Mutant DNA
         *     description: Detects if a DNA sequence belongs to a mutant
         *     operationId: registerDna
         *     tags: 
         *       - Mutants
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/RegisterDnaBody'
         *     responses:
         *       200:
         *         description: Mutant detected
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/RegisterDnaResponse'
         *       403:
         *         description: Human detected (Forbidden)
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             examples:
         *               Forbidden:
         *                 value:
         *                   statusCode: 403
         *                   message: "Is a human"
         *       400:
         *         description: Invalid DNA format (Bad Request)
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ErrorResponse'
         *             examples:
         *               BadRequest:
         *                 value:
         *                   statusCode: 400
         *                   message: "Invalid DNA format"
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
