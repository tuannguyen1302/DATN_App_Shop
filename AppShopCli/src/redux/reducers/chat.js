import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chatData',
  initialState: {
    chatData: null,
  },
  reducers: {
    saveChat: (state, action) => {
      state.chatData = action.payload;
    },
  },
});

export const {saveChat} = chatSlice.actions;
export default chatSlice.reducer;
