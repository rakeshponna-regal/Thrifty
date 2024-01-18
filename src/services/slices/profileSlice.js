import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders :[],
    returns :[],
    paymentMethods :[],
    sellerAuth :[]
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearState: state => {
            state.orders = [];
            state.returns = [];
            state.paymentMethods = [];
            state.sellerAuth = [];
            return state;
          },
        addToSeller(state, { payload }) {
            console.log(payload)
            // const { user_id } = payload;
            if(state.sellerAuth == undefined)
            state.sellerAuth = []

            state.sellerAuth.push({
                ...payload,
            });
            // const find = state.sellerAuth.find((item) => item.user_id === user_id);
            // if (find) {
            //     return state.map((item) =>
            //         item.orderId === orderId
            //             ? {
            //                 ...item
            //             }
            //             : item
            //     );
            // } else {
            //     state.push({
            //         ...payload,
            //     });
            // }
        },
    },
    
});

// Action creators are generated for each case reducer function
export const { clearState,addToSeller} = profileSlice.actions;
export default profileSlice.reducer;