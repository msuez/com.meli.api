import { Server } from './httpd/';
import { envs } from './config/envs';
import { AppRoutes } from './routes';

export const app = new Server({
    env: envs.NODE_ENV,
    port: envs.PORT || 3000,
    routes: AppRoutes.routes,
});
