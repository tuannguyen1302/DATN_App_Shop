import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chatData',
  initialState: {
    chatData: null,
    notifi: 0,
  },
  reducers: {
    saveChat: (state, action) => {
      state.chatData = action.payload;
    },
    saveNoti: (state, action) => {
      state.notifi = action.payload;
    },
  },
});

export const {saveChat, saveNoti} = chatSlice.actions;
export default chatSlice.reducer;
