import { checkSequence, isMutant } from '../../src/helpers/dna.helper';

describe("DNA sequence analysis functions", () => {
    describe("checkSequence function", () => {
        it("should return true for a valid horizontal sequence", () => {
            const dna = [
                "AAAA",
                "CCCC",
                "GGGG",
                "TTTT"
            ];
            expect(checkSequence({ dna, x: 0, y: 0, dx: 0, dy: 1, sequenceLength: 4 })).toBe(true);
        });

        it("should return true for a valid vertical sequence", () => {
            const dna = [
                "A",
                "A",
                "A",
                "A"
            ];
            expect(checkSequence({ dna, x: 0, y: 0, dx: 1, dy: 0, sequenceLength: 4 })).toBe(true);
        });

        it("should return true for a valid diagonal sequence", () => {
            const dna = [
                "A---",
                "-A--",
                "--A-",
                "---A"
            ];
            expect(checkSequence({ dna, x: 0, y: 0, dx: 1, dy: 1, sequenceLength: 4 })).toBe(true);
        });

        it("should return false for an incomplete diagonal sequence", () => {
            const dna = [
                "A---",
                "-A--",
                "--A-",
                "---G"
            ];
            expect(checkSequence({ dna, x: 0, y: 0, dx: 1, dy: 1, sequenceLength: 4 })).toBe(false);
        });

        it("should return false if the sequence goes out of bounds", () => {
            const dna = [
                "AAA",
                "AAA",
                "AAA"
            ];
            expect(checkSequence({ dna, x: 0, y: 0, dx: 1, dy: -1, sequenceLength: 4 })).toBe(false);
        });
    });

    describe("isMutant function", () => {
        it("should return true for a mutant DNA with multiple sequences", () => {
            const dna = [
                "AAAAGT",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });

        it("should return false for a human DNA with no repeating sequences", () => {
            const dna = [
                "ATCGGA",
                "TTCGGC",
                "ATTATT",
                "AGATGG",
                "CGCTCA",
                "TCATGT"
            ];
            expect(isMutant(dna)).toBe(false);
        });

        it("should return true if there are exactly two or more valid sequences in different directions", () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });

        it("should handle a minimal DNA sequence grid", () => {
            const dna = ["A"];
            expect(isMutant(dna)).toBe(false);
        });

        it("should handle a case with multiple overlapping sequences", () => {
            const dna = [
                "AAAAGT",
                "AAGTGC",
                "TAATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });
    });
});
