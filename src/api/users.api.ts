import { Alert } from 'react-native';
import { url } from './client';
import { User, UserData } from '../types/user';

// Migrated to AWS Lambda ✅
export const createUser = async (user: User) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/create-user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );

  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const createCustomerInStripe = async (user: User) => {
  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/create-customer-in-stripe',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );
  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const fetchToken = async (userData: object) => {
  try {
    const response = await fetch(
      'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/login-user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message);
    }
    const token = await resData.token;
    return token;
  } catch (error) {
    Alert.alert('Authentication Failed - 2', 'Error 2');
  }
};

// Migrated to AWS Lambda ✅
export const getUserByEmail = async (email: string) => {
  const userData = {
    email: email,
  };

  const response = await fetch(
    'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/get-user-by-email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  );
  const resData = await response.json();
  return resData;
};

export const saveUserDataToDatabase = async (userData: UserData) => {
  try {
    const userId = userData.id;
    const result = await fetch(
      'https://oyrhq868lf.execute-api.us-east-1.amazonaws.com/update-user/' +
        userId,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );
    const resData = await result.json();
    return resData;
  } catch (error) {
    Alert.alert('User could not be saved. Try again later.');
  }
};

// export const saveUserDataToContext = async (userData) => {
//   try {
//     const userId = userData.id;
//     const result = await fetch(url + '/user/update-user/' + userId, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });
//     const resData = await result.json();
//     return resData;
//   } catch (error) {
//     Alert.alert('User could not be saved. Try again later.');
//   }
// };

export const saveFavoritesToDatabase = async (
  userId: string,
  updatedFavorites: Number[],
) => {
  const data = {
    userId: userId,
    updatedFavorites: updatedFavorites,
  };
  const result = await fetch(url + '/product/save-updated-favorites/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await result.json();
};

export const clearCartInDatabase = async (userId: string) => {
  await fetch(url + '/user/clear-cart' + userId);
};
