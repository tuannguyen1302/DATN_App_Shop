import {SHOP_API} from '../../config/urls';
import {apiGet, apiPut} from '../../utils/utils';
import {saveUser} from '../reducers/user';
import store from '../store';

export const saveUserData = async () => {
  try {
    const res = await apiGet(`${SHOP_API}/getShopForShop`);
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
