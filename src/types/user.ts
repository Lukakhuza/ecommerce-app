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
    items: any[];
  };
  cart: { items: any[] };
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
  cart: { items: any[] };
  stripeCustomerId: string;
};
