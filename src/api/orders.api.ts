import { url } from './client';

export const createOrder = async (orderData: object) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/create-order',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    },
  );
  const resData = await response.json();
  return resData;
};

export const fetchOrders = async (userId: string) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/fetch-orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
    },
  );

  const resData = await response.json();
  return resData;
};
