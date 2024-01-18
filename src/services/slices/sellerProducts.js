import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const sellerProductsSlice = createSlice({
    name: 'sellerProducts',
    initialState,
    reducers: {
        clearState: state => {
            return [];
          },
          addToSellerProducts(state, { payload }) {
            state.push({
                ...payload,
            });
        },
    },
});

export const { clearState,addToSellerProducts} = sellerProductsSlice.actions;
export default sellerProductsSlice.reducer;