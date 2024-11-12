import * as path from 'path';
import { RequestHandler } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

import { envs } from './envs';

export class Swagger {

    static setup(port:number): RequestHandler {
        const swaggerOptions : SwaggerOptions = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'MELI Mutants API',
                    version: '1.0.0',
                    description: 'Matias Suez Mercadolibre Challenge API Documentation',
                    contact: {
                        name: 'Matias',
                        surname: 'Suez',
                        email: 'matisuez@gmail.com',
                    },
                },
            },
            apis: [
                '**/*.ts',
            ],
        };
        return swaggerUi.setup(swaggerJSDoc(swaggerOptions));
    }

    static get serve() {
        return swaggerUi.serve;
    }

}
