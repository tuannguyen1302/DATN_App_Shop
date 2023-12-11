import {ORDER_API} from '../../config/urls';
import {apiGet, apiPatch} from '../../utils/utils';
import {saveOrder, updateStatus} from '../reducers/order';
import store from '../store';

export const saveOrderData = async text => {
  try {
    const res = await apiGet(`${ORDER_API}/getAllOrderForShop/${text}`);
    const orderData = res?.message?.orderRes?.user;
    store.dispatch(saveOrder({value: text, data: orderData}));
    return false;
  } catch (error) {
    throw error;
  }
};

export const updateOrderData = async data => {
  try {
    const apiEndpoint =
      data?.value === 'cancelled'
        ? `${ORDER_API}/cancelByShop/${data?.oderId}`
        : `${ORDER_API}/changeStatus`;
    const patchData = () => {
      if (data?.value == 'shipped') {
        return {order_id: data?.oderId, status: 'shipped'};
      } else if (data?.value == 'delivered') {
        return {order_id: data?.oderId, status: 'delivered'};
      }
      return undefined;
    };
    await apiPatch(apiEndpoint, patchData());
    store.dispatch(updateStatus(data));
    return true;
  } catch (error) {
    throw error;
  }
};
