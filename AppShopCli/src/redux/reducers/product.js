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
      state.productData = {
        all: null,
        con_hang: null,
        het_hang: null,
        private: null,
      };
      state.productData[value] = data;
    },
    saveType: (state, action) => {
      state.typeData = action.payload;
    },
  },
});

export const {saveProduct, saveType} = productSlice.actions;
export default productSlice.reducer;
