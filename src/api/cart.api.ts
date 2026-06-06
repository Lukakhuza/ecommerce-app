import { CartItemType } from '../types/cart';
import { url } from './client';
import { debounce } from 'lodash';

// Migrated to AWS Lambda ✅
export const addToCartInDatabase = async (data: CartItemType) => {
  const response = await fetch(`${url}add-to-cart-in-database`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const updateCartInDatabase = debounce(async (data: Object) => {
  const response = await fetch(`${url}update-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
}, 3000);
