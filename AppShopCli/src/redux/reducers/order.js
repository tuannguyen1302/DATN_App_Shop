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
      state.orderData[value] = data || [];
    },

    updateStatus: (state, action) => {
      const {oderId, value} = action.payload;
      const findOrderByStatus = status =>
        state.orderData[status].find(order => order.oderId === oderId);

      const updateData = statusToRemove =>
        state.orderData[statusToRemove].filter(
          order => order.oderId !== oderId,
        );

      const patchData = () => {
        if (value === 'delivered') {
          return findOrderByStatus('shipped');
        }
        return findOrderByStatus('pending');
      };

      const orderToUpdate = patchData();

      if (orderToUpdate) {
        if (value === 'delivered') {
          state.orderData.shipped = updateData('shipped');
        } else {
          state.orderData.pending = updateData('pending');
        }
      }
    },
  },
});

export const {saveOrder, updateStatus} = orderSlice.actions;
export default orderSlice.reducer;
