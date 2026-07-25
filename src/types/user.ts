import { CartItems } from './cart';

export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipcode: string;
  };
  shopFor: string;
  ageRange: string;
  favorites: {
    items: CartItems;
  };
  cart: { items: CartItems[] };
  stripeCustomerId: string;
};

export type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    zipcode: string;
  };
  shopFor: string;
  ageRange: string;
  cart: { items: CartItems };
  stripeCustomerId: string;
};
