import mongoose from 'mongoose';

import { envs } from '../../src/config/envs';
import { connectDB } from '../../src/config/database';

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('connectDB', () => {
    it('should connect to MongoDB successfully', async () => {
        (mongoose.connect as jest.Mock).mockResolvedValueOnce(true);

        const result = await connectDB();

        expect(result).toBe(true);
        expect(mongoose.connect).toHaveBeenCalledWith(envs.MONGO_URI, {
            "connectTimeoutMS": 20000,
            "socketTimeoutMS": 60000,
        });
    });

    it('should throw an error when connection fails', async () => {
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('MongoDB connection error'));

        await expect(connectDB()).rejects.toThrow('Failed to connect to MongoDB');
    });

    it('should use SSL/TLS settings in production environment', async () => {
        envs.NODE_ENV = 'pro';
        (mongoose.connect as jest.Mock).mockResolvedValueOnce(true);

        const result = await connectDB();

        expect(result).toBe(true);
        expect(mongoose.connect).toHaveBeenCalledWith(envs.MONGO_URI, {
            ssl: true,
            tls: true,
            "connectTimeoutMS": 20000,
            "socketTimeoutMS": 60000,
        });
    });

    it('should not use SSL/TLS settings in non-production environment', async () => {
        envs.NODE_ENV = 'dev';
        (mongoose.connect as jest.Mock).mockResolvedValueOnce(true);

        const result = await connectDB();

        expect(result).toBe(true);
        expect(mongoose.connect).toHaveBeenCalledWith(envs.MONGO_URI, {
            "connectTimeoutMS": 20000,
            "socketTimeoutMS": 60000,
        });
    });
});