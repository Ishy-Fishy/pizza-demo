import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { Order } from "../../../lib/models/orderModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({ message: "No id" });
  }
  await dbConnect();
  const order = await Order.findById(id);
  return res.json({ order });
}
