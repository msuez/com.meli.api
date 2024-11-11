import { StatsService } from '../../src/services/stats.service';
import dnaModel from '../../src/models/dna.model';

jest.mock('../../src/models/dna.model');

describe('StatsService', () => {
    let statsService: StatsService;

    beforeEach(() => {
        statsService = new StatsService();
    });

    it('should return dna stats with correct counts and ratio', async () => {
        const mutantCount = 5;
        const humanCount = 10;

        dnaModel.countDocuments = jest.fn()
            .mockResolvedValueOnce(mutantCount)
            .mockResolvedValueOnce(humanCount);

        const result = await statsService.getDnaStats();

        expect(dnaModel.countDocuments).toHaveBeenCalledTimes(2);
        expect(dnaModel.countDocuments).toHaveBeenCalledWith({ isMutant: true });
        expect(dnaModel.countDocuments).toHaveBeenCalledWith({ isMutant: false });

        expect(result).toEqual({
            count_mutant_dna: mutantCount,
            count_human_dna: humanCount,
            ratio: mutantCount / humanCount,
        });
    });

    it('should handle case where there are no humans and return a ratio of 0', async () => {
        const mutantCount = 5;
        const humanCount = 0;

        dnaModel.countDocuments = jest.fn()
            .mockResolvedValueOnce(mutantCount)
            .mockResolvedValueOnce(humanCount);

        const result = await statsService.getDnaStats();

        expect(result).toEqual({
            count_mutant_dna: mutantCount,
            count_human_dna: humanCount,
            ratio: 0,
        });
    });

    it('should handle errors if countDocuments throws an error', async () => {
        dnaModel.countDocuments = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(statsService.getDnaStats()).rejects.toThrow('Database error');
    });
});
