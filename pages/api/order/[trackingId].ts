import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import { Order } from "../../../lib/models/order.model";
import { findByTrackingId } from "../../../lib/dao/order.dao";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { trackingId } = req.query;
  if (!trackingId || typeof trackingId !== "string") {
    return res.status(400).send({ message: "No id" });
  }
  await dbConnect();
  const order = await findByTrackingId(trackingId);
  //todo: public data trim/transform?
  return res.json({ order });
}
