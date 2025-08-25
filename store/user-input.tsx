import { createContext, useState, type ReactNode } from "react";

const emptyUserInput = {
  firstName: { value: "", isValid: true },
  lastName: { value: "", isValid: true },
  emailAddress: { value: "", isValid: true },
  password: { value: "", isValid: true },
  phoneNumber: { value: "", isValid: true },
  shopFor: { value: "", isValid: true },
  ageRange: { value: "", isValid: true },
  address: {
    addressLine1: { value: "", isValid: true },
    city: { value: "", isValid: true },
    state: { value: "", isValid: true },
    zipcode: { value: "", isValid: true },
  },
  cart: { items: [] },
};

export const UserInputContext: any = createContext(emptyUserInput);

type Props = {
  children: ReactNode;
};

const UserInputContextProvider = ({ children }: Props) => {
  const [userInput, setUserInput] = useState(emptyUserInput);
  const updateUserInput = (
    inputIdentifier: any,
    enteredText: string,
    inputValid: boolean
  ) => {
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: {
          value: enteredText,
          isValid: inputValid,
        },
      };
    });
  };

  const clearUserInput = () => {
    setUserInput(emptyUserInput);
  };

  const value = {
    userInput: userInput,
    updateUserInput: updateUserInput,
    clearUserInput: clearUserInput,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
export default UserInputContextProvider;
