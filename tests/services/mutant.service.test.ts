import { MutantService } from '../../src/services/mutant.service';
import dnaModel from '../../src/models/dna.model';

jest.mock('../../src/models/dna.model');

describe('MutantService', () => {
    let mutantService: MutantService;

    beforeEach(() => {
        mutantService = new MutantService();
    });

    it('should call dnaModel.create with correct parameters when saveDna is called', async () => {
        const dna = ["ATCGGA", "TTCGGA", "ATTATT", "AGATGG", "CGCTCA", "TCATTT"];
        const isMutant = true;

        dnaModel.create = jest.fn().mockResolvedValue(undefined);

        await mutantService.saveDna(dna, isMutant);

        expect(dnaModel.create).toHaveBeenCalledTimes(1);
        expect(dnaModel.create).toHaveBeenCalledWith({ dna, isMutant });
    });

    it('should handle errors if dnaModel.create throws an error', async () => {
        const dna = ["ATCGGA", "TTCGGA", "ATTATT", "AGATGG", "CGCTCA", "TCATTT"];
        const isMutant = true;

        dnaModel.create = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(mutantService.saveDna(dna, isMutant)).rejects.toThrow('Database error');
    });
});
