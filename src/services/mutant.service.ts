import dnaModel from '../models/dna.model';

export class MutantService {
    public async saveDna(dna: string[], isMutant: boolean): Promise<void> {
        await dnaModel.create({
            dna,
            isMutant,
        });
    }
}
