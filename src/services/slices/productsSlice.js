import { createSlice } from "@reduxjs/toolkit";
import { storeProductsFromJson } from "../api/productService";

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    products: []
  },
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.products = []
      return state;
    },
    setProduct: (state, {payload}) => {
        state.products = payload;
        return state;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeProductsFromJson.fulfilled, (state, payload) => {
        console.log("object payload fulfilled =>", payload)
        state.isFetching = false;
        state.isSuccess = true;
      }).addCase(storeProductsFromJson.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
  },
});

export const { clearState ,setProduct} = productSlice.actions;
export default productSlice.reducer;

export { storeProductsFromJson };