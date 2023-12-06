import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
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

export const {saveChat} = orderSlice.actions;
export default orderSlice.reducer;
