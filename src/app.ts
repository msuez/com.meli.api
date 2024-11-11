import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

import { Server } from './httpd/';
import { envs } from './config/envs';
import { AppRoutes } from './routes';

export const app = new Server({
    env: envs.NODE_ENV,
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
});

const server = awsServerlessExpress.createServer(app.startServerless());

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
    awsServerlessExpress.proxy(server, event, context);
};