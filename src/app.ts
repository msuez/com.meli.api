import { Server } from './httpd/';
import { envs } from './config/envs';
import { AppRoutes } from './routes';

export const app = new Server({
    port: envs.PORT || 3000,
    env: envs.NODE_ENV,
    routes: AppRoutes.routes,
});
