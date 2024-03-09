import { Schema, model, Document } from "mongoose";
import IComparison from "../types/comparision";

const ComparisonSchema = new Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
}, { timestamps: true });

const Comparison = model<IComparison>("Comparison", ComparisonSchema);

export default Comparison;
