import { createContext, useState } from 'react';
import { Props } from '../types/general';

type PaymentMethodType = {
  id: string;
  card: { brand: string; last4: string };
} | null;

type CheckoutContextType = {
  shippingAddress: {
    addressLine1: { value: string; isValid: boolean };
    city: { value: string; isValid: boolean };
    state: { value: string; isValid: boolean };
    zipcode: { value: string; isValid: boolean };
  };
  paymentMethod: PaymentMethodType;
  updateShippingAddress: (
    inputIdentifier: string,
    enteredText: string,
    inputValid: boolean,
  ) => void;
  updatePaymentMethod: (data: PaymentMethodType) => void;
};

export const CheckoutContext = createContext<CheckoutContextType>({
  shippingAddress: {
    addressLine1: { value: '', isValid: true },
    city: { value: '', isValid: true },
    state: { value: '', isValid: true },
    zipcode: { value: '', isValid: true },
  },
  paymentMethod: null,
  updateShippingAddress: (inputIdentifier, enteredText, inputValid) => {},
  updatePaymentMethod: () => {},
});

const emptyShippingAddress = {
  addressLine1: { value: '', isValid: true },
  city: { value: '', isValid: true },
  state: { value: '', isValid: true },
  zipcode: { value: '', isValid: true },
};

const CheckoutContextProvider = ({ children }: Props) => {
  const [shippingAddress, setShippingAddress] = useState(emptyShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(null);

  const updatePaymentMethod = (data: PaymentMethodType) => {
    setPaymentMethod(data);
  };

  const updateShippingAddress = (
    inputIdentifier: string,
    enteredText: string,
    inputValid: boolean,
  ) => {
    setShippingAddress(currInputValues => {
      return {
        ...currInputValues,
        [inputIdentifier]: {
          value: enteredText,
          isValid: inputValid,
        },
      };
    });
  };

  const value = {
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    updateShippingAddress: updateShippingAddress,
    updatePaymentMethod: updatePaymentMethod,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
