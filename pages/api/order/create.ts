import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import {
  Order,
  IOrder,
  IOrderMetadataDelivery,
  IOrderMetadataTakeout,
  TOrderType,
  defaultOrderStatus,
} from "../../../lib/models/order.model";
import { IOrderItem } from "../../../lib/models/item.model";
import { calculatePrice, getDocuments } from "../../../lib/dao/item.dao";
import { nanoid } from "nanoid";

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
    metadata,
  }: {
    items: Array<IOrderItem>;
    type: TOrderType;
    comments: string;
    metadata: IOrderMetadataTakeout | IOrderMetadataDelivery;
  } = body;
  try {
    const itemIds = items.map((item) => item.id);
    const validatedItems = await getDocuments(itemIds);
    if (itemIds.length !== validatedItems.length) {
      return res.status(400).json({ message: "Invalid request data" });
    }
    const priceTotal = await calculatePrice(items);
    const trackingId = nanoid(7);
    const orderPayload: IOrder = {
      items: itemIds,
      total: priceTotal,
      comments,
      metadata,
      type,
      trackingId,
      status: defaultOrderStatus,
    };
    // await Order.validate(orderPayload); // save runs validate under the hood, consider find one and update or something
    await Order.create(orderPayload);
    return res.json({
      message: "Order created successfully!",
      trackingId,
    });

    // const order = new Order({
    //   items: itemIds,
    //   total: priceTotal,
    //   comments,
    //   type,
    // });
  } catch (e) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  // try {
  //   await Order.validate(order);
  // } catch (err) {
  //   return res.status(400).json({ message: "Invalid status" });
  // }
  // await dbConnect();
  // await order.save();
  // return res.json({ order });
}
