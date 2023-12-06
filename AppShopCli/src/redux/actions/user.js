import {SHOP_API} from '../../config/urls';
import socketServices from '../../utils/socketService';
import {apiGet, apiPut} from '../../utils/utils';
import {saveUser} from '../reducers/user';
import store from '../store';
import {saveChatData} from './chat';

export const saveUserData = async () => {
  try {
    const res = await apiGet(`${SHOP_API}/getShopForShop`);
    socketServices.emit('new-user-add', res?.message?._id);
    socketServices.on(`new messager${res?.message?._id}`, msg => {
      console.log('Xin chào ', msg);
      saveChatData();
    });
    store.dispatch(saveUser(res?.message));
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async data => {
  try {
    await apiPut(`${SHOP_API}/updateShop`, data, {
      'Content-Type': 'multipart/form-data',
    });
    saveUserData();
  } catch (error) {
    throw error;
  }
};
