import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./auth-context";
import { getUserByEmail } from "../api/users.api";

const emptyUserInput = {
  firstName: { value: "", isValid: true },
  lastName: { value: "", isValid: true },
  emailAddress: { value: "", isValid: true },
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
  const { token, getEmailFromToken }: any = useContext(AuthContext);
  const [userInput, setUserInput] = useState(emptyUserInput);
  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        return;
      }
      const email = await getEmailFromToken(token);
      const userData = await getUserByEmail(email);
      setUserInput({
        firstName: {
          value: userData.user.firstName ? userData.user.firstName : "",
          isValid: true,
        },
        lastName: {
          value: userData.user.lastName ? userData.user.lastName : "",
          isValid: true,
        },
        emailAddress: { value: email ? email : "", isValid: true },
        phoneNumber: {
          value: userData.user.phoneNumber ? userData.user.phoneNumber : "",
          isValid: true,
        },
        shopFor: { value: "", isValid: true },
        ageRange: { value: "", isValid: true },
        address: {
          addressLine1: {
            value: userData.user.address.addressLine1
              ? userData.user.address.addressLine1
              : "",
            isValid: true,
          },
          city: {
            value: userData.user.address.city ? userData.user.address.city : "",
            isValid: true,
          },
          state: {
            value: userData.user.address.state
              ? userData.user.address.state
              : "",
            isValid: true,
          },
          zipcode: {
            value: userData.user.address.zipcode
              ? userData.user.address.zipcode
              : "",
            isValid: true,
          },
        },
        cart: {
          items: userData.user.cart.items ? userData.user.cart.items : [],
        },
      });
    };
    getUser();
  }, [token]);

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
