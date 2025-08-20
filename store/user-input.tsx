import { createContext, useState, type ReactNode } from "react";

const emptyUserInput = {
  firstName: { value: "", isValid: true },
  lastName: { value: "", isValid: true },
  emailAddress: { value: "", isValid: true },
  password: { value: "", isValid: true },
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

  const value = {
    userInput: userInput,
    updateUserInput: updateUserInput,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
export default UserInputContextProvider;
