import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'productData',
  initialState: {
    productData: {
      all: null,
      con_hang: null,
      het_hang: null,
      private: null,
    },
  },
  reducers: {
    saveProduct: (state, action) => {
      const {value, data} = action.payload;
      state.productData[value] = data;
    },
    updateStatus: (state, action) => {
      const {productId, value} = action.payload;

      const updatedProduct = state.productData.all.find(
        product => product.productId === productId,
      );

      if (updatedProduct) {
        state.productData.pending = state.productData.pending.filter(
          product => product.productId !== productId,
        );
        state.productData[value].push({...updatedProduct, status: value});
      }
    },
  },
});

export const {saveProduct, updateStatus} = orderSlice.actions;
export default orderSlice.reducer;
