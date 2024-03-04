import { NextApiRequest, NextApiResponse } from "next";
import { seedInitialDatabaseRecords } from "../../lib/seed";
import dbConnect from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { items, foundItems } = await seedInitialDatabaseRecords();
  return res.status(200).json({ items, foundItems });
}
