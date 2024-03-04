import { Order } from "../models/order.model";

export function findByTrackingId(trackingId: string) {
  return Order.find({ trackingId }).sort({ createdAt: "desc" }).exec();
}
