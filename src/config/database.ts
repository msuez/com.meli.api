import mongoose from 'mongoose';
import { envs } from './envs';

export const connectDB = async ():Promise<boolean> => {
    try {
        const uri = envs.MONGO_URI;
        await mongoose.connect(uri);
        return true;
    } catch (error) {
        throw new Error('Failed to connect to MongoDB');
    }
};
