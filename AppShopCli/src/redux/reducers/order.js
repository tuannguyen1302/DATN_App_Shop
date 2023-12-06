import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderData',
  initialState: {
    orderData: {
      pending: null,
      shipped: null,
      delivered: null,
      cancelled: null,
    },
  },
  reducers: {
    saveOrder: (state, action) => {
      const {value, data} = action.payload;
      state.orderData[value] = data;
    },
    updateStatus: (state, action) => {
      const {oderId, value} = action.payload;

      const updatedOrder = state.orderData.pending.find(
        order => order.oderId === oderId,
      );

      if (updatedOrder) {
        state.orderData.pending = state.orderData.pending.filter(
          order => order.oderId !== oderId,
        );
        state.orderData[value].push({...updatedOrder, status: value});
      }
    },
  },
});

export const {saveOrder, updateStatus} = orderSlice.actions;
export default orderSlice.reducer;
