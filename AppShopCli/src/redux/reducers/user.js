import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
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

export const {saveUser} = userSlice.actions;
export default userSlice.reducer;
