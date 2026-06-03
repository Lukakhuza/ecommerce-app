import { url } from './client';

// Migrated to AWS Lambda ✅
export const addPaymentMethod = async (paymentMethodData: Object) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/add-payment-method',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentMethodData),
    },
  );
  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const fetchPaymentMethods = async (stripeCustomerId: string) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/get-payment-methods/' +
      stripeCustomerId,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const resData = await response.json();
  return resData;
};
