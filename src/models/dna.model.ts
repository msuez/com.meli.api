import mongoose, { Schema, Document } from 'mongoose';

interface IDna extends Document {
    dna: string[];
    isMutant: boolean;
}

const DnaSchema: Schema = new Schema({
    dna: {
        type: [String],
        required: [true, 'DNA is required'],
    },
    isMutant: {
        type: Boolean,
        required: [true, 'isMutant flag is required'],
    },
}, {
    timestamps: true,
});

export default mongoose.model<IDna>('Dna', DnaSchema);
