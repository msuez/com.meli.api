import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { Server } from './httpd/';
import { envs } from './config/envs';
import { AppRoutes } from './routes';

type Serverless = ReturnType<typeof awsServerlessExpress.createServer>;

export const app = new Server({
    env: envs.NODE_ENV,
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
});

let server: Serverless;

const initializeServer = async () => {
    if (!server) {
        const expressApp = await app.startServerless();
        server = awsServerlessExpress.createServer(expressApp);
    }
};

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await initializeServer();
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};