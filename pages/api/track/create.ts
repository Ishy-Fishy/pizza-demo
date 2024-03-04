import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { Order, IOrder } from "../../../lib/models/orderModel";
import { IItem, IOrderItem } from "../../../lib/models/item.model";
import { validateIds, validateOrderItems } from "../../../lib/dao/item.dao";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (!body) {
    return res.status(400).json({ message: "Invalid request data" });
  }
  const {
    items,
    type,
    comments,
  }: { items: Array<IOrderItem>; type: IOrder["type"]; comments: string } =
    body;
  const order = new Order({});
  order.items
  await order.populate('items')
  const validatedItems = await validateOrderItems(items);
  order.status = "pending";
  try {
    await Order.validate(order);
  } catch (err) {
    return res.status(400).json({ message: "Invalid status" });
  }
  await dbConnect();
  await order.save();
  return res.json({ order });
}
