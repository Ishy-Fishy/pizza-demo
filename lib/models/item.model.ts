import mongoose, { Schema, model, Model, Document } from "mongoose";

type TPriceTag = "small" | "medium" | "large" | "xlarge" | "vegan"; //whatever price options you want to add

interface IPrice {
  tag: TPriceTag;
  amount: number;
}

export interface IItem {
  name: string;
  prices: Array<IPrice>;
  // possibleToppings: Array<IPrice>  Array //could be more flexible and add extra toppings as an extra array key
  description: string;
  image?: {
    cloudId?: string;
    staticUrl?: string;
  };
}

export interface IOrderItem {
  selectedPrice: number;
  id: string;
  document?: Document;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  prices: [{ tag: String, amount: Number }],
  description: { type: String, required: true },
  image: {
    cloudId: String,
    staticUrl: String,
  },
});

export default (mongoose.models.Item as Model<IItem>) ||
  model<IItem>("Item", ItemSchema);
