import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error during setItem:', e);
  }
};

const getItem = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      // console.log(`No data found for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving data for key ${key}: ${error.message}`);
    throw error;
  }
};

const clearAllItem = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error during clearAllItem:', error);
  }
};

const apiReq = async (endPoint, data, method, headers, requestOptions = {}) => {
  try {
    const token = await getItem('LoginUser');

    headers = {
      'x-xclient-id': token?.userId,
      authorization: token?.accessToken,
      ...headers,
    };

    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    const response = await axios[method](endPoint, data, {headers});
    const responseData = response.data;

    if (responseData.status === false) {
      throw responseData;
    }

    return responseData;
  } catch (error) {
    console.error('Error during API request:', error);

    if (error.response && error.response.status === 401) {
      throw {...error.response.data, msg: 'Unauthorized'};
    }

    if (error.response && error.response.data) {
      throw {
        ...error.response.data,
        msg: error.response.data.message || 'Network Error',
      };
    } else {
      throw {message: 'Network Error', msg: 'Network Error'};
    }
  }
};

const createApiFunction =
  method =>
  (endPoint, data, headers = {}) =>
    apiReq(endPoint, data, method, headers);

export const apiGet = createApiFunction('get');
export const apiPut = createApiFunction('put');
export const apiPost = createApiFunction('post');
export const apiDelete = createApiFunction('delete');
export const apiPatch = createApiFunction('patch');

export {setItem, getItem, clearAllItem};
