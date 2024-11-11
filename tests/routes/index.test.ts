import request from 'supertest';
import express, { Express, } from 'express';

import { AppRoutes } from '../../src/routes';

describe('AppRoutes', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(AppRoutes.routes);
    });

    it('should return a Pong response from /ping', async () => {
        const response = await request(app)
            .get('/ping')
            .expect(200);

        expect(response.body).toEqual({
            message: 'Pong',
            status: 'Success',
        });
    });

    it('should return 404 for non-existing routes', async () => {
        const response = await request(app)
            .get('/non-existing-route')
            .expect(404);

        expect(response.text).toContain('Cannot GET /non-existing-route');
    });
});
