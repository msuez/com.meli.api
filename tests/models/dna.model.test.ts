import mongoose from 'mongoose';
import DnaModel from '../../src/models/dna.model';
import { connect, closeDatabase, clearDatabase } from '../setupDatabase';

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Dna Model', () => {
    it('should create and save a mutant DNA record successfully', async () => {
        const dnaData = {
            dna: ["ATCGGA", "TTCGGA", "ATTATT", "AGATGG", "CGCTCA", "TCATTT"],
            isMutant: true,
        };

        const dnaRecord = new DnaModel(dnaData);
        const savedRecord = await dnaRecord.save();

        expect(savedRecord._id).toBeDefined();
        expect(savedRecord.dna).toEqual(expect.arrayContaining(dnaData.dna));
        expect(savedRecord.isMutant).toBe(dnaData.isMutant);
    });

    it('should create and save a human DNA record successfully', async () => {
        const dnaData = {
            dna: ["GTGCAA", "TGCAAC", "ATGCAT", "TACGTA", "CGTACG", "TGCATG"],
            isMutant: false,
        };

        const dnaRecord = new DnaModel(dnaData);
        const savedRecord = await dnaRecord.save();

        expect(savedRecord._id).toBeDefined();
        expect(savedRecord.dna).toEqual(expect.arrayContaining(dnaData.dna));
        expect(savedRecord.isMutant).toBe(dnaData.isMutant);
    });

    it('should fail validation if `dna` is missing', async () => {
        const dnaData = { isMutant: true };
        const dnaRecord = new DnaModel(dnaData);
    
        try {
            await dnaRecord.validate();
        } catch (error) {
            const validationError = error as mongoose.Error.ValidationError;

            expect(validationError).toBeDefined();
            expect(validationError).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(validationError.errors).toHaveProperty('dna');
        }
    });

    it('should fail validation if `isMutant` is missing', async () => {
        const dnaData = { dna: ["ATCGGA", "TTCGGA", "ATTATT", "AGATGG", "CGCTCA", "TCATTT"] };
        const dnaRecord = new DnaModel(dnaData);
    
        let error: any;
        try {
            await dnaRecord.validate();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors).toHaveProperty('isMutant');
    });

});
