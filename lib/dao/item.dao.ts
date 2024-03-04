import Item, { IOrderItem } from "../models/item.model";

const defaultPaginationLimit = 20;

export function getAllItems(paginationLimit = defaultPaginationLimit) {
  return Item.find().limit(paginationLimit);
}

export function getDocuments(ids: Array<string>) {
  return Item.find({ id: { $in: [...ids] } });
}

export async function populateItemIds(order: Array<IOrderItem>): Promise<Array<IOrderItem>> {
  const ids = order.reduce((acc, { id }) => {
    acc.push(id);
    return acc;
  }, []);
  const documents = await getDocuments(ids);
  for (let item in order) {
    
  }
}

export function validatePricepoints(orderItems: Array<IOrderItem>) {
  let valid = true;
  for (let {selectedPrice, document} of orderItems) {
  }
};
