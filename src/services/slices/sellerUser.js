import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const sellerUserSlice = createSlice({
    name: 'sellerUser',
    initialState,
    reducers: {
        clearState: state => {
            return [];
          },
          addToSelleruser(state, { payload }) {
            state.push({
                ...payload,
            });
        },
    },
});

export const { clearState,addToSelleruser} = sellerUserSlice.actions;
export default sellerUserSlice.reducer;