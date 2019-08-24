import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from 'config';

export const api = async (url, method, body) => {
  /**
   * config object for fetch
   */
  const config = {
    method: 'get',
    baseURL: BASE_URL,
    url,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      authorization: await AsyncStorage.getItem('auth_token'),
    },
  };

  if (method) {
    config.method = method;
  }
  if (body) {
    config.data = body;
  }

  let response;
  try {
    response = await axios(config);
    return { ...response.data };
  } catch (e) {
    throw new Error(e.response.data.message || e.response.data || e.message);
  }
};
