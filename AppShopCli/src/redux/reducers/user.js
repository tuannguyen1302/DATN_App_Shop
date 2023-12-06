import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {saveUser} = authSlice.actions;
export default authSlice.reducer;
