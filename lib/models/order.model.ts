import { Schema, Types, model } from "mongoose";
import { IItem } from "./item.model";

export type TOrderStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "ready"
  | "delivering"
  | "done";

export const defaultOrderStatus: TOrderStatus = "pending";

export type TOrderType = "takeout" | "delivery";

export interface IOrderMetadataTakeout {
  phone: String;
  estimatedTime?: Date;
}

export interface IOrderMetadataDelivery extends IOrderMetadataTakeout {
  address: String;
}

export interface IOrder {
  items: Array<string | IItem>;
  trackingId: string;
  total: number;
  comments?: string;
  status: TOrderStatus;
  type: TOrderType;
  metadata: IOrderMetadataTakeout | IOrderMetadataDelivery;
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
    trackingId: { type: String, required: true },
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
