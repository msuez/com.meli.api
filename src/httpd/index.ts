import cors from 'cors';
import morgan from 'morgan';
import express, { Router, } from 'express';
import { Server as HttpServer } from 'http';

import { Swagger } from '../config/swagger';
import { connectDB } from '../config/database';
import { errorHandler } from '../middlewares/errorHandler';

interface Options {
    env:string;
    port: number;
    routes: Router;
    publicFolder?:string;
}

export class Server {

    private readonly env:string;
    private readonly port: number;
    private readonly routes: Router;
    private serverListener?: HttpServer;
    
    public readonly app = express();

    constructor(options:Options) {
        const {
            env,
            port,
            routes,
        } = options;
        this.env = env;
        this.port = port;
        this.routes = routes;
    }

    private create() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true,
        }));

        // this.app.use(morgan('dev'));

        //* Swagger documentation
        this.app.use('/docs', Swagger.serve, Swagger.setup(this.port));

        //* Routes
        this.app.use('/', this.routes);

        //* Catch all
        this.app.use('*', (req, res) => {
            res.status(404).send(`Not found.`);
        });

        //* Error handler
        this.app.use(errorHandler);
    }

    public async startServerless() {
        await connectDB();
        this.create();
        return this.app;
    }

    public async start() {
        await connectDB();
        this.create();
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }

    public close() {
        this.serverListener?.close();
    }

}
