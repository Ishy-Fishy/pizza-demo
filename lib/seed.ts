import Item, { IItem } from "./models/item.model";

const SeededItems: Array<IItem> = [
  {
    name: "Pepperoni",
    prices: [
      { tag: "small", amount: 20 },
      { tag: "medium", amount: 35 },
      { tag: "large", amount: 50 },
    ],
    description: "Pepe's finest",
    image: {
      cloudId: "pizza/tvp94octcywfodb5oifd",
    },
  },
  {
    name: "Bacon pizza",
    prices: [
      { tag: "small", amount: 20 },
      { tag: "medium", amount: 35 },
      { tag: "small", amount: 50 },
    ],
    description: "Which part of bacon pizza you don't get?",
    image: {
      cloudId: "pizza/zl8zre3mlz5wfhy4gcji",
    },
  },
  {
    name: "Cheddar Grease",
    prices: [
      { tag: "small", amount: 20 },
      { tag: "medium", amount: 35 },
      { tag: "small", amount: 50 },
      { tag: "xlarge", amount: 123 },
    ],
    description: "Death by cholesterol",
    image: {
      cloudId: "pizza/zl8zre3mlz5wfhy4gcji",
    },
  },
  {
    name: "Something",
    prices: [{ tag: "vegan", amount: 20 }],
    description: "Here's your, uh, something...",
    // no image for default image test
  },
];

export async function seedInitialDatabaseRecords() {
  await Item.createCollection();
  await Item.deleteMany({});
  const itemDoc = SeededItems.map((obj) => new Item(obj));
  const items = await Item.bulkSave(itemDoc);
  const foundItems = await Item.find().limit(10);
  return { items, foundItems };
}
