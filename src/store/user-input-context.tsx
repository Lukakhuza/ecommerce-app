import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserByEmail, saveUserDataToDatabase } from '../api/users.api';
import { Props } from '../types/general';
import { wait } from '../utils/helpers';
import { AuthContext } from './auth-context';
import { CartItems } from '../types/cart';
import { UserData } from '../types/user';

type UpdatedAddressValues = {
  addressLine1: { value: string; isValid: boolean };
  city: { value: string; isValid: boolean };
  state: { value: string; isValid: boolean };
  zipcode: { value: string; isValid: boolean };
};

type CreatedUser = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: {
      addressLine1: string;
      city: string;
      state: string;
      zipcode: string;
    };
    shopFor: string;
    favorites: { items: [] };
    cart: { items: CartItems };
    stripeCustomerId: string;
    stripePaymentMethod: { id: string; card: { brand: string; last4: string } };
    _id: string;
    __v: number;
  };
};

type UpdatedInfo = {
  firstName: { value: string; isValid: boolean };
  lastName: { value: string; isValid: boolean };
  phoneNumber: { value: string; isValid: boolean };
};

type UserInputContextType = {
  userInput: {
    id: { value: string; isValid: boolean };
    firstName: { value: string; isValid: boolean };
    lastName: { value: string; isValid: boolean };
    emailAddress: { value: string; isValid: boolean };
    password: { value: string; isValid: boolean };
    phoneNumber: { value: string; isValid: boolean };
    address: {
      addressLine1: { value: string; isValid: boolean };
      city: { value: string; isValid: boolean };
      state: { value: string; isValid: boolean };
      zipcode: { value: string; isValid: boolean };
    };
    shopFor: { value: string; isValid: boolean };
    ageRange: { value: string; isValid: boolean };
    favorites: { items: number[] };
    cart: { items: CartItems };
    stripeCustomerId: string;
  };

  isLoading: boolean;
  updateUserInfo: (updatedInfo: UpdatedInfo) => void;
  updateUserInput: (
    inputIdentifier: string,
    enteredText: string,
    inputValid: boolean,
  ) => void;
  saveUserDataToDatabase: (userData: UserData) => void;
  updateAddress: (updatedAddressValues: UpdatedAddressValues) => void;
  updateStripeId: (createdUser: CreatedUser, stripeId: string) => void;
  clearUserInput: () => void;
};

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

export const UserInputContext = createContext<UserInputContextType>({
  userInput: {
    id: { value: '', isValid: false },
    firstName: { value: '', isValid: false },
    lastName: { value: '', isValid: false },
    emailAddress: { value: '', isValid: false },
    password: { value: '', isValid: false },
    phoneNumber: { value: '', isValid: false },
    address: {
      addressLine1: { value: '', isValid: false },
      city: { value: '', isValid: false },
      state: { value: '', isValid: false },
      zipcode: { value: '', isValid: false },
    },
    shopFor: { value: '', isValid: false },
    ageRange: { value: '', isValid: false },
    favorites: { items: [] },
    cart: { items: [] },
    stripeCustomerId: '',
  },
  isLoading: false,
  updateUserInfo: (updatedInfo: UpdatedInfo) => {},
  saveUserDataToDatabase: (userData: UserData) => {},
  updateUserInput: (
    inputIdentifier: string,
    enteredText: string,
    inputValid: boolean,
  ) => {},
  updateAddress: (updatedAddressValues: UpdatedAddressValues) => {},
  updateStripeId: (createdUser: CreatedUser, stripeId: string) => {},
  clearUserInput: () => {},
});

type DecodedToken = {
  email: string;
  userId: string;
  iat: number;
  exp: number;
};

const UserInputContextProvider = ({ children }: Props) => {
  const { authToken } = useContext(AuthContext);
  const [userInput, setUserInput] = useState(emptyUserInput);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    if (!authToken) return;
    const decoded: DecodedToken = jwtDecode(authToken);
    const email = decoded.email;
    const user = await getUserByEmail(email);

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
      stripeCustomerId: user?.stripeCustomerId ? user?.stripeCustomerId : '',
    });
  };

  // If there is an auth token, get auth data based on it:
  useEffect(() => {
    getUserData();
  }, [authToken]);

  const updateUserInput = (
    inputIdentifier: string,
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
  const updateUserInfo = async (updatedInfo: UpdatedInfo) => {
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
      stripeCustomerId: userInput?.stripeCustomerId,
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
  const updateAddress = async (updatedAddressValues: UpdatedAddressValues) => {
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
      stripeCustomerId: userInput?.stripeCustomerId,
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
  const updateStripeId = async (createdUser: CreatedUser, stripeId: string) => {
    console.log('Test 600: ', createdUser);
    const {
      _id: id,
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      shopFor,
      cart,
    } = createdUser.userData;

    // Create an user object with updated address:
    setIsLoading(true);
    const userData = {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: {
        addressLine1: address?.addressLine1,
        city: address?.city,
        state: address?.state,
        zipcode: address?.zipcode,
      },
      shopFor: shopFor,
      ageRange: '27 to 35',
      cart: { items: cart?.items },
      stripeCustomerId: stripeId,
    };

    // Save updated user data to database.
    const resData = await saveUserDataToDatabase(userData);
    // If address update in the database was successful, update the context.
    setUserInput(currInputValues => {
      return {
        ...currInputValues,
        stripeCustomerId: resData.userData?.stripeCustomerId,
      };
    });
    await wait(1000);
    setIsLoading(false);
  };

  const clearUserInput = () => {
    setUserInput(emptyUserInput);
  };

  const value = {
    userInput,
    isLoading,
    updateUserInfo,
    updateUserInput,
    saveUserDataToDatabase,
    updateAddress,
    updateStripeId,
    clearUserInput,
  };

  return (
    <UserInputContext.Provider value={value}>
      {children}
    </UserInputContext.Provider>
  );
};
export default UserInputContextProvider;
