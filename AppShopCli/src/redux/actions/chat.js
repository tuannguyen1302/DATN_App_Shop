import {CHAT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {saveChat, saveNoti} from '../reducers/chat';
import store from '../store';

export const saveChatData = async () => {
  try {
    const res = await apiGet(`${CHAT_API}/getConvarsationsForShop`);
    store.dispatch(saveChat(res?.message));
    return true;
  } catch (error) {
    // throw error;
  }
};

export const saveNotiData = async count => {
  try {
    store.dispatch(saveNoti(count));
    return true;
  } catch (error) {
    //  throw error;
  }
};
