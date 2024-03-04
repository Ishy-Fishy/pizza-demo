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
      cloudId: "b7dfa0be30ddcdecb6c0c5c2ffd69f16",
    },
  },
  {
    name: "Bacon Something",
    prices: [
      { tag: "small", amount: 20 },
      { tag: "medium", amount: 35 },
      { tag: "small", amount: 50 },
    ],
    description: "Something is better than nothing",
    image: {
      cloudId: "95adccaebe1d6225508e1c93a9c5fd95",
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
      cloudId: "95adccaebe1d6225508e1c93a9c5fd95",
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
