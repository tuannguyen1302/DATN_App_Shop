import { SHOP_API } from '../../config/urls';
import socketServices from '../../utils/socketService';
import { apiGet, apiPut, getItem } from '../../utils/utils';
import { saveUser } from '../reducers/user';
import store from '../store';

export const saveUserData = async (navigation) => {
  try {
    //console.log(await getItem('notifi'));
    const res = await apiGet(`${SHOP_API}/getShopForShop`);

    store.dispatch(saveUser(res?.message));
  } catch (error) {
    console.log(error.code);
    if (error.code === 403) {
      navigation.navigate('Updateprofile');
    }
    // throw error;
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
