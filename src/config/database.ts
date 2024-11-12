import mongoose from 'mongoose';
import { envs } from './envs';

export const connectDB = async ():Promise<boolean> => {
    try {
        const uri = envs.MONGO_URI;
        await mongoose.connect(uri, {
            ...(
                envs.NODE_ENV === 'pro' ? {
                    ssl: true,
                    tls: true,
                } : {}
            ),
            socketTimeoutMS: 60000,
            connectTimeoutMS: 20000,
        });
        return true;
    } catch (error) {
        throw new Error('Failed to connect to MongoDB');
    }
};
