type Product = {
  id: number;
  title: string;
  price: number;
};

export type CartItemType = {
  product: Product;
  quantity: number;
  _id: string;
};
