import {ORDER_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {updateStatus} from '../reducers/product';
import store from '../store';

export const saveProductData = async text => {
  try {
    const res = await apiGet(`${ORDER_API}/getAllOrderForShop/${text}`);
    const orderData = res?.message?.orderRes?.user;
    store.dispatch(saveOrder({value: text, data: orderData}));
  } catch (error) {
    throw error;
  }
};

export const updateProductData = async data => {
  try {
  } catch (error) {
    throw error;
  }
};
