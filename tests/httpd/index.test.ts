import http from 'http';
import request from 'supertest';
import { Router } from 'express';
import { Server } from '../../src/httpd/';
import * as database from '../../src/config/database';
import { AppRoutes } from '../../src/routes';

jest.setTimeout(15000);
jest.mock('../../src/config/database');
jest.mock('../../src/middlewares/errorHandler');

describe('Server', () => {
    let server: Server;
    const routes: Router = AppRoutes.routes;

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(() => {
        server = new Server({
            env: 'development',
            port: 3000,
            routes,
        });
    });

    afterEach(()=>{
        server.close();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should call connectDB and set up middlewares', async () => {
        const connectDBMock = jest.spyOn(database, 'connectDB').mockResolvedValue(true);

        await server.start();
        expect(connectDBMock).toHaveBeenCalled();

        const response = await request(server.app).get('/ping');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Pong', status: 'Success' });
    });

    it('should return 404 for invalid routes', async () => {
        await server.start();

        const response = await request(server.app).get('/nonexistent');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Not found.');
    });

    it('should start the server on the correct port', async () => {
        const listenMock = jest.fn().mockReturnValue(http.createServer(() => {}));

        jest.spyOn(server.app, 'listen').mockImplementationOnce((port: number, callback?: () => void) => {
            listenMock(port);
            if (callback) {
                callback();
            }
            return listenMock();
        });
    
        await server.start();

        expect(listenMock).toHaveBeenCalledWith(3000);
    });

    it('should close the server', async () => {
        await server.start();
    
        const closeSpy = jest.spyOn(server['serverListener']!, 'close');
        server.close();
    
        expect(closeSpy).toHaveBeenCalled();
    });
});
