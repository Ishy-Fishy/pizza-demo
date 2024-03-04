import { NextApiRequest, NextApiResponse } from "next";
import { IItem } from "../../../lib/models/item.model";
import { getAllItems } from "../../../lib/dao/item.dao";

type ResponseData = {
  items: Array<IItem>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const paginationLimit = Number.isNaN(+req.query.paginationLimit)
    ? null
    : +req.query.paginationLimit;
  const items = await getAllItems(paginationLimit);
  res.status(200).json({ items });
}
