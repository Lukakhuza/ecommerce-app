export type CartProduct = {
  id: number;
  title: string;
  price: number;
};

export type CartItem = {
  _id: string;
  product: CartProduct;
  quantity: number;
};

export type CartItems = CartItem[];
