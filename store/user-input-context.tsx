import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./auth-context";
import { wait } from "../util/helpers";
import { getUserByEmail, saveUserDataToDatabase } from "../api/users.api";

const emptyUserInput = {
  id: { value: "", isValid: true },
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
  favorites: { items: [] },
  cart: { items: [] },
};

export const UserInputContext: any = createContext(emptyUserInput);

type Props = {
  children: ReactNode;
};

const UserInputContextProvider = ({ children }: Props) => {
  const { token, getEmailFromToken }: any = useContext(AuthContext);
  const [userInput, setUserInput] = useState(emptyUserInput);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        return;
      }
      const email = await getEmailFromToken(token);
      const userData = await getUserByEmail(email);
      setUserInput({
        id: { value: userData.user.id ? userData.user.id : "", isValid: true },
        firstName: {
          value: userData.user.firstName ? userData.user.firstName : "",
          isValid: true,
        },
        lastName: {
          value: userData.user.lastName ? userData.user.lastName : "",
          isValid: true,
        },
        emailAddress: {
          value: email ? email : "",
          isValid: true,
        },
        password: {
          value: userData.user.password ? userData.user.password : "",
          isValid: true,
        },
        phoneNumber: {
          value: userData.user.phoneNumber ? userData.user.phoneNumber : "",
          isValid: true,
        },
        shopFor: {
          value: userData.user.shopFor ? userData.user.shopFor : "",
          isValid: true,
        },
        ageRange: {
          value: userData.user.ageRange ? userData.user.ageRange : "",
          isValid: true,
        },
        address: {
          addressLine1: {
            value: "100 Main St.",
            isValid: true,
          },
          city: {
            value: "Washington",
            isValid: true,
          },
          state: {
            value: "NJ",
            isValid: true,
          },
          zipcode: {
            value: "08560",
            isValid: true,
          },
        },
        favorites: {
          items: userData.user.favorites.items
            ? userData.user.favorites.items
            : [],
        },
        cart: { items: [] },
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

  // Updates user's first name, last name and phone number
  const updateUserInfo = async (updatedInfo: any) => {
    setIsLoading(true);
    const userData = {
      id: userInput.id.value,
      email: userInput.emailAddress.value,
      password: userInput.password.value,
      firstName: updatedInfo.firstName.value,
      lastName: updatedInfo.lastName.value,
      phoneNumber: updatedInfo.phoneNumber.value,
      address: {
        addressLine1: userInput.address.addressLine1.value,
        city: userInput.address.city.value,
        state: userInput.address.state.value,
        zipcode: userInput.address.zipcode.value,
      },
      shopFor: userInput.shopFor.value,
      ageRange: userInput.ageRange.value,
      cart: { items: userInput.cart.items },
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);

    // If user info update in the database was successful, update the context.
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        firstName: {
          isValid: true,
          value: resData.userData.firstName,
        },
        lastName: {
          isValid: true,
          value: resData.userData.lastName,
        },
        phoneNumber: {
          isValid: true,
          value: resData.userData.phoneNumber,
        },
      };
    });
    await wait(1000);
    setIsLoading(false);
  };

  // Updates user's address
  const updateAddress = async (updatedAddressValues: any) => {
    // Create an user object with updated address:
    setIsLoading(true);
    const userData = {
      id: userInput.id.value,
      email: userInput.emailAddress.value,
      firstName: userInput.firstName.value,
      lastName: userInput.lastName.value,
      phoneNumber: userInput.phoneNumber.value,
      address: {
        addressLine1: updatedAddressValues.addressLine1.value,
        city: updatedAddressValues.city.value,
        state: updatedAddressValues.state.value,
        zipcode: updatedAddressValues.zipcode.value,
      },
      shopFor: userInput.shopFor.value,
      ageRange: userInput.ageRange.value,
      cart: { items: userInput.cart.items },
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);

    // If address update in the database was successful, update the context.
    setUserInput((currInputValues) => {
      return {
        ...currInputValues,
        address: {
          addressLine1: {
            isValid: true,
            value: resData.userData.address.addressLine1,
          },
          city: { isValid: true, value: resData.userData.address.city },
          state: {
            isValid: true,
            value: resData.userData.address.state,
          },
          zipcode: {
            isValid: true,
            value: resData.userData.address.zipcode,
          },
        },
      };
    });
    await wait(1000);
    setIsLoading(false);
  };

  const clearUserInput = () => {
    setUserInput(emptyUserInput);
  };

  const value = {
    userInput: userInput,
    isLoading: isLoading,
    updateUserInfo: updateUserInfo,
    updateUserInput: updateUserInput,
    saveUserDataToDatabase: saveUserDataToDatabase,
    updateAddress: updateAddress,
    clearUserInput: clearUserInput,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
export default UserInputContextProvider;
