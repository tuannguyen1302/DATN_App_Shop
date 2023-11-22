import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
) {
  return new Promise(async (res, rej) => {
    const token = await getItem('LoginUser');

    headers = {
      'Content-Type': 'multipart/form-data',
      'x-xclient-id': token?.userId,
      authorization: token?.accessToken,
      ...headers,
    };
    if (method === 'get' || method == 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }
    axios[method](endPoint, data, {headers})
      .then(result => {
        const {data} = result;

        if (data.status === false) {
          return rej(data);
        }
        return res(data);
      })
      .catch(error => {
        console.log(error);
        console.log(error && error.response, 'the error response');
        if (error && error.response && error.response.status === 401) {
          return rej({...error.response.data, msg: 'Aunauthorized'});
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({message: 'Network Error', msg: 'Network Error'});
        }
      });
  });
}

export function apiGet(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'get', headers);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiPatch(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'patch', headers);
}

export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error raised during setItem', e);
  }
};

export const getItem = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData;
    } else {
      console.log(`No data found for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving data for key ${key}: ${error.message}`);
    throw error;
  }
};

export const clearAllItem = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Error raised during setItem ', error);
  }
};
