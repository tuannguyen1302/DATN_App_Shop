import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productData',
  initialState: {
    productData: {
      all: null,
      con_hang: null,
      het_hang: null,
      private: null,
    },
    typeData: null,
  },
  reducers: {
    saveProduct: (state, action) => {
      const {value, data} = action.payload;
      state.productData[value] = data;
    },
    updateStatus: (state, action) => {
      const {isDraft, productId} = action.payload;

      const updatedProduct = state.productData.all.find(
        product => product._id === productId,
      );

      if (updatedProduct) {
        state.productData.pending = state.productData.pending.filter(
          product => product._id !== productId,
        );
        state.productData[value].push({...updatedProduct, status: value});
      }
    },
    saveType: (state, action) => {
      state.typeData = action.payload;
    },
  },
});

export const {saveProduct, updateStatus, saveType} = productSlice.actions;
export default productSlice.reducer;
