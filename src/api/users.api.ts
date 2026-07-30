import { Alert } from 'react-native';
import { User, UserData } from '../types/user';
import { url } from './client';

// Migrated to AWS Lambda ✅
export const createUser = async (user: User) => {
  const response = await fetch(`${url}/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const createCustomerInStripe = async (user: User) => {
  const response = await fetch(`${url}/create-customer-in-stripe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const fetchToken = async (userData: object) => {
  try {
    const response = await fetch(`${url}/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
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

  const response = await fetch(`${url}/get-user-by-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  return resData;
};

// Migrated to AWS Lambda ✅
export const saveUserDataToDatabase = async (userData: UserData) => {
  try {
    const userId = userData.id;
    const result = await fetch(`${url}/update-user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const resData = await result.json();
    return resData;
  } catch (error) {
    Alert.alert('User could not be saved. Try again later.');
  }
};

// Migrated to AWS Lambda ✅
export const saveFavoritesToDatabase = async (
  userId: string,
  updatedFavorites: Number[],
) => {
  const data = {
    userId: userId,
    updatedFavorites: updatedFavorites,
  };
  const result = await fetch(`${url}/save-updated-favorites`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resData = await result.json();
};
