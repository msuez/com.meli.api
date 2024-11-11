import dnaModel from '../models/dna.model';

export class StatsService {
    public async getDnaStats() {
        const mutantCount = await dnaModel.countDocuments({ isMutant: true });
        const humanCount = await dnaModel.countDocuments({ isMutant: false });
        const ratio = humanCount === 0 ? 0 : mutantCount / humanCount;

        return {
            count_mutant_dna: mutantCount,
            count_human_dna: humanCount,
            ratio,
        };
    }
}
