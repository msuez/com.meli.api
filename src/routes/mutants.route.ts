
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
         *     description: Detects if a DNA sequence belongs to a mutant.
         *     operationId: registerDna
         *     tags:
         *       - Mutants
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
         *                 description: The DNA sequence to register
         *                 example: ["ATCGGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
         *             required:
         *               - dna
         *     responses:
         *       200:
         *         description: Mutant detected
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   description: Indicates if the DNA sequence is from a mutant
         *                   example: "Is a mutant"
         *               required:
         *                 - message
         *       403:
         *         description: Human detected (Forbidden)
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 statusCode:
         *                   type: integer
         *                   description: HTTP status code of the error
         *                   example: 403
         *                 message:
         *                   type: string
         *                   description: Description of the error
         *                   example: "Is a human"
         *               required:
         *                 - statusCode
         *                 - message
         *       400:
         *         description: Invalid DNA format (Bad Request)
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 statusCode:
         *                   type: integer
         *                   description: HTTP status code of the error
         *                   example: 400
         *                 message:
         *                   type: string
         *                   description: Description of the error
         *                   example: "Invalid DNA format"
         *               required:
         *                 - statusCode
         *                 - message
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
