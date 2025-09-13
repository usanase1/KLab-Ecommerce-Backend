import mongoose, { Document, Schema } from "mongoose";

interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model<ICart>("Cart", cartSchema);
