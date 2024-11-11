interface CheckSequenceParams {
    dna: string[];
    x: number;
    y: number;
    dx: number;
    dy: number;
    sequenceLength: number;
}

export const checkSequence = ({
    dna,
    x,
    y,
    dx,
    dy,
    sequenceLength
}: CheckSequenceParams): boolean => {
    const n = dna.length;
    const base = dna[x][y];

    for (let i = 1; i < sequenceLength; i++) {
        const newX = x + i * dx;
        const newY = y + i * dy;
        if (
            newX >= n || newY >= n || newY < 0 ||
            dna[newX][newY] !== base
        ) {
            return false;
        }
    }
    return true;
};

export const isMutant = (dna: string[]): boolean => {
    const n = dna.length;
    const sequenceLength = 4;
    let mutantSequences = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (
                checkSequence({ dna, x: i, y: j, dx: 1, dy: 0, sequenceLength }) ||
                checkSequence({ dna, x: i, y: j, dx: 0, dy: 1, sequenceLength }) ||
                checkSequence({ dna, x: i, y: j, dx: 1, dy: 1, sequenceLength }) ||
                checkSequence({ dna, x: i, y: j, dx: 1, dy: -1, sequenceLength })
            ) {
                mutantSequences++;
                if (mutantSequences > 1) {
                    return true;
                }
            }
        }
    }

    return false;
};