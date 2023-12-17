import { SHOP_API } from '../../config/urls';
import { apiGet, apiPut } from '../../utils/utils';
import { saveUser } from '../reducers/user';
import store from '../store';

export const saveUserData = async navigation => {
  try {
    const res = await apiGet(`${SHOP_API}/getShopForShop`);

    store.dispatch(saveUser(res?.message));
    return true;
  } catch (error) {
    console.log(error.code);
    if (error.code === 403) {
      navigation.navigate('Updateprofile');
    }
  }
};

export const updateUserData = async (data, navigation) => {
  try {
    const res = await apiPut(`${SHOP_API}/updateShop`, data, {
      'Content-Type': 'multipart/form-data',
    });
    console.log(data);
    console.log(res);
    return await saveUserData(navigation);
  } catch (error) {
    //throw error;
  }
};