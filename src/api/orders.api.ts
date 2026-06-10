import { url } from './client';

// Migrated to AWS Lambda ✅
export const createOrder = async (orderData: object) => {
  const response = await fetch(`${url}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const fetchOrders = async (userId: string) => {
  const response = await fetch(`${url}/fetch-orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: userId }),
  });

  const resData = await response.json();
  return resData;
};
