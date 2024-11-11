
import {envs} from '../../src/config/envs';

describe('Environments Variables', () => {
    test('Should return envs', () => {
        expect( envs ).toEqual({
            PORT: 3000,
            NODE_ENV: 'test',
            MONGO_URI: 'mongodb://localhost:27017/test',
        });
    });
    test('Should return error if not found env', async() => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('../../src/config/envs');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${ error }`).toContain(`"PORT" should be a valid integer`);
        }
    });
});
