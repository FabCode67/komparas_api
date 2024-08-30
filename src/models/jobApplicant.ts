import Ijobapplicant from '../types/job';
import { model, Schema } from 'mongoose';

const jobApplicantSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        backgroundInfo: {
            type: String,
            required: true
        },
        isPriotized: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true }
);

export default model<Ijobapplicant>('JobApplicant', jobApplicantSchema);