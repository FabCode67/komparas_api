// import { Schema, model, Document } from "mongoose";

// const ComparisonSchema = new Schema({
//     user: { type: String, required: true },
//     product: { type: String, required: true },
// }, { timestamps: true });

// const Comparison = model("Comparison", ComparisonSchema);

// export default Comparison;

 export interface IComparison extends Document {
        [x: string]: any;
        userId: string;
        productId: string;
        product?: any; // Include this field for storing the product information

    }

    export default IComparison;

    import { Document, Schema } from "mongoose";

