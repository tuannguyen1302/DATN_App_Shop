import {CHAT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {saveChat} from '../reducers/chat';
import store from '../store';

export const saveChatData = async () => {
  try {
    const res = await apiGet(`${CHAT_API}/getConvarsationsForShop`);
    store.dispatch(saveChat(res?.message));
  } catch (error) {
    throw error;
  }
};
