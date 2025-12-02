import { createContext, useState, type ReactNode } from "react";

export const CheckoutContext: any = createContext({
  shippingAddress: {},
  updateShippingAddress: () => {},
});

type Props = {
  children: ReactNode;
};

const emptyShippingAddress = {
  addressLine1: { value: "", isValid: true },
  city: { value: "", isValid: true },
  state: { value: "", isValid: true },
  zipcode: { value: "", isValid: true },
};

const CheckoutContextProvider = ({ children }: Props) => {
  const [shippingAddress, setShippingAddress] = useState(emptyShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  const updatePaymentMethod = (data: Object) => {
    setPaymentMethod(data);
  };

  const updateShippingAddress = (
    inputIdentifier: string,
    enteredText: string,
    inputValid: boolean
  ) => {
    setShippingAddress((currInputValues) => {
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
