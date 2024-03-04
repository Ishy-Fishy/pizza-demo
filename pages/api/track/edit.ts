import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { Order } from "../../../lib/models/orderModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (!body) {
    return res.status(400).json({ message: "Invalid request data" });
  }
  const { id, status } = body;
  if (!id || !status) {
    return res.status(400).json({ message: "Invalid parameters" });
  }
  await dbConnect();
  const order = await Order.findById(id);
  order.status = status;
  try {
    await Order.validate(order);
  } catch (err) {
    return res.status(400).json({ message: "Invalid status" });
  }
  await order.save();
  return res.json({ order });
}
