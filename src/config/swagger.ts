import path from 'path';
import YAML from 'yamljs';
import { RequestHandler } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const definitions = YAML.load(path.join(__dirname, '../routes/definitions.yml'));

const combinedSchemas = {
    ...definitions.components.schemas,
};

export class Swagger {

    static setup(port:number): RequestHandler {
        const swaggerOptions = {
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
                components: {
                    schemas: combinedSchemas,
                },
            },
            apis: ['**/*.ts'],
        };
        return swaggerUi.setup(swaggerJSDoc(swaggerOptions));
    }

    static get serve() {
        return swaggerUi.serve;
    }

}
