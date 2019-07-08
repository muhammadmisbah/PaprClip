import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const api = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
