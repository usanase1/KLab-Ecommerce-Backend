import mongoose , {Document, Schema} from 'mongoose';

export interface Iproduct extends Document {
    name: string;
    price: number;
    description: string;
    inStock: boolean;

}

const productSchema =  new Schema<Iproduct>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    inStock: {type: Boolean, required: true, default: true}
}
,
{timestamps: true});

export default mongoose.model<Iproduct>("Product", productSchema)