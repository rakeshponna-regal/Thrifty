import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const productInfoSlice = createSlice({
    name: 'productsInfo',
    initialState,
    reducers: {
        clearProductsInfoState: state => {
            return [];
        },
        addToProductsList(state, { payload }) {
            return [payload, ...state];
        },
        removeItemFromProduct (state,{payload}){
            const index = state.findIndex(item => item.id === payload);
            state = state.filter((_, i) => i !== index);
            return state
        },
        addToProducts(state, { payload }) {
            return payload.reduce((updatedState, newItem) => {
                const { id } = newItem;
                const findIndex = updatedState.findIndex((item) => item.id === id);
                if (findIndex !== -1) {
                    console.log('updating...');
                    return updatedState.map((item, index) =>
                        index === findIndex ? { ...item, ...newItem } : item
                    );
                } else {
                    console.log('adding...');
                    return [...updatedState, newItem];
                }
            }, [...state]);
        },
    },
});

export const { clearProductsInfoState, addToProducts ,addToProductsList,removeItemFromProduct} = productInfoSlice.actions;
export default productInfoSlice.reducer;