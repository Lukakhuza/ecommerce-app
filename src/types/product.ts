export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export type ProductData = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type ProductDataWithUserId = {
  productData: ProductData;
  userId: string;
};

export type FavoriteItemData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};
