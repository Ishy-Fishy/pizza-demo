import { Schema, Types, model } from "mongoose";
import { IItem } from "./item.model";

interface TakeoutOption {
  phone: String;
  estimatedTime?: Date;
}

interface DeliveryOption extends TakeoutOption {
  address: String;
}

export interface IOrder {
  items: [IItem];
  total: number;
  comments?: string;
  status:
    | "pending"
    | "confirmed"
    | "cancelled"
    | "ready"
    | "delivering"
    | "done";
  type: "takeout" | "delivery";
  metadata: TakeoutOption | DeliveryOption;
}

const TakeoutSchemaObj = {
  phone: { type: String, required: true },
  estimatedTime: Date,
};

const DeliverySchemaOption = {
  ...TakeoutSchemaObj,
  address: { type: String, required: true },
};

const OrderSchema = new Schema<IOrder>(
  {
    items: [{ type: Types.ObjectId, ref: "Item", required: true }],
    total: { type: Number, required: true },
    comments: String,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "ready",
        "delivering",
        "done",
      ],
      required: true,
      default: "pending",
    },
    type: { type: String, enum: ["takeout", "delivery"], required: true },
  },
  { timestamps: true, discriminatorKey: "type" }
);

export const Order = model("Order", OrderSchema);

export const TakeoutOrder = Order.discriminator(
  "takeout",
  new Schema({ metadata: TakeoutSchemaObj })
);

export const DeliveryOrder = Order.discriminator(
  "delivery",
  new Schema({ metadata: DeliverySchemaOption })
);
