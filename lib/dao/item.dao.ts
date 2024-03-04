import Item, { IItem, IOrderItem } from "../models/item.model";

const defaultPaginationLimit = 20;

export function getAllItems(
  paginationLimit = defaultPaginationLimit,
  paginationOffset = 0
) {
  return Item.find().skip(paginationOffset).limit(paginationLimit).exec();
}

export function getDocuments(ids: Array<string>) {
  return Item.find({ id: { $in: [...ids] } }).exec();
}

export async function calculatePrice(orderItems: Array<IOrderItem>) {
  const ids = orderItems.map((item) => item.id);
  const documents = await getDocuments(ids);
  const docMap: { [id: string]: IItem } = documents.reduce((acc, doc) => {
    acc[String(doc.id)] = doc;
    return acc;
  }, {});
  let total = 0;
  for (let item of orderItems) {
    const { prices } = docMap[item.id];
    const { amount } = prices.find((price) => price.tag === item.selectedTag);
    total += amount;
  }
  return total;
}
