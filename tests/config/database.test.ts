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
        expect(mongoose.connect).toHaveBeenCalledWith(envs.MONGO_URI);
    });

    it('should throw an error when connection fails', async () => {
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('MongoDB connection error'));

        await expect(connectDB()).rejects.toThrow('Failed to connect to MongoDB');
    });
});