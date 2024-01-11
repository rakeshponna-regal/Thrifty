import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrders(state) {
            return [];
        },
        addToOrders(state, { payload }) {
            console.log(payload)
            const { orderId } = payload;
            const find = state.find((item) => item.orderId === orderId);
            if (find) {
                return state.map((item) =>
                    item.orderId === orderId
                        ? {
                            ...item
                        }
                        : item
                );
            } else {
                state.push({
                    ...payload,
                });
            }
        },
    },
    
});

// Action creators are generated for each case reducer function
export const { clearOrders,addToOrders} = orderSlice.actions;
export default orderSlice.reducer;