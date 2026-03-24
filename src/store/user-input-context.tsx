import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getUserByEmail, saveUserDataToDatabase } from '../api/users.api';
import { wait } from '../utils/helpers';
import { AuthContext } from './auth-context';

const emptyUserInput = {
  id: { value: '', isValid: true },
  firstName: { value: '', isValid: true },
  lastName: { value: '', isValid: true },
  emailAddress: { value: '', isValid: true },
  password: { value: '', isValid: true },
  phoneNumber: { value: '', isValid: true },
  shopFor: { value: '', isValid: true },
  ageRange: { value: '', isValid: true },
  address: {
    addressLine1: { value: '', isValid: true },
    city: { value: '', isValid: true },
    state: { value: '', isValid: true },
    zipcode: { value: '', isValid: true },
  },
  favorites: { items: [] },
  cart: { items: [] },
  stripeCustomerId: '',
};

export const UserInputContext: any = createContext(emptyUserInput);

type Props = {
  children: ReactNode;
};

const UserInputContextProvider = ({ children }: Props) => {
  const { token, authData, authToken }: any = useContext(AuthContext);
  const [userInput, setUserInput] = useState(emptyUserInput);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    if (!authToken) return;
    const decoded: any = jwtDecode(authToken);
    const email = decoded.email;
    const { user } = await getUserByEmail(email);
    setUserInput({
      id: { value: user.id ? user.id : '', isValid: true },
      firstName: {
        value: user.firstName ? user.firstName : '',
        isValid: true,
      },
      lastName: {
        value: user.lastName ? user.lastName : '',
        isValid: true,
      },
      emailAddress: {
        value: email ? email : '',
        isValid: true,
      },
      password: {
        value: user.password ? user.password : '',
        isValid: true,
      },
      phoneNumber: {
        value: user.phoneNumber ? user.phoneNumber : '',
        isValid: true,
      },
      shopFor: {
        value: user.shopFor ? user.shopFor : '',
        isValid: true,
      },
      ageRange: {
        value: user.ageRange ? user.ageRange : '',
        isValid: true,
      },
      address: {
        addressLine1: {
          value: user.address.addressLine1 ? user.address.addressLine1 : '',
          isValid: true,
        },
        city: {
          value: user.address.city ? user.address.city : '',
          isValid: true,
        },
        state: {
          value: user.address.state ? user.address.state : '',
          isValid: true,
        },
        zipcode: {
          value: user.address.zipcode ? user.address.zipcode : '',
          isValid: true,
        },
      },
      favorites: {
        items: user.favorites.items ? user.favorites.items : [],
      },
      cart: {
        items: user.cart.items ? user.cart.items : [],
      },
      stripeCustomerId: user.stripeCustomerId ? user.stripeCustomerId : '',
    });
  };

  // If there is an auth token, get auth data based on it:
  useEffect(() => {
    getUserData();
  }, [authToken]);

  const updateUserInput = (
    inputIdentifier: any,
    enteredText: string,
    inputValid: boolean,
  ) => {
    setUserInput(currInputValues => {
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
      stripeCustomerId: userInput.stripeCustomerId,
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);

    // If user info update in the database was successful, update the context.
    setUserInput(currInputValues => {
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
      stripeCustomerId: userInput.stripeCustomerId,
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);

    // If address update in the database was successful, update the context.
    setUserInput(currInputValues => {
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

  // Updates user's address
  const updateStripeId = async (createdUser: any, stripeId: any) => {
    const {
      id,
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      shopFor,
      cart,
    } = createdUser;
    // Create an user object with updated address:
    setIsLoading(true);
    const userData = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: {
        addressLine1: address.addressLine1,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
      },
      shopFor: shopFor,
      ageRange: '27 to 35',
      cart: { items: cart.items },
      stripeCustomerId: stripeId,
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);
    // If address update in the database was successful, update the context.
    setUserInput(currInputValues => {
      return {
        ...currInputValues,
        stripeCustomerId: resData.userData.stripeCustomerId,
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
    updateStripeId: updateStripeId,
    clearUserInput: clearUserInput,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
export default UserInputContextProvider;
