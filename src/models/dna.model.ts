import mongoose, { Schema, Document } from 'mongoose';

interface IDna extends Document {
    dna: string[];
    isMutant: boolean;
}

const DnaSchema: Schema = new Schema({
    dna: {
        type: [String],
        required: true,
    },
    isMutant: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<IDna>('Dna', DnaSchema);
