import mongoose from 'mongoose';
import { envs } from './envs';

export const connectDB = async ():Promise<boolean> => {
    try {
        const uri = envs.MONGO_URI;
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
