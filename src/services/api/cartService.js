import Realm from 'realm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import realmSchema, { sch_cart, sch_user } from '../../database/RealmConfig';

export const getCart = createAsyncThunk(
    '/cart',
    async (data, thunkAPI) => {
        try {
            let cart = realmSchema.objects(sch_cart);
            console.log(cart)
            return thunkAPI.fulfillWithValue(cart);
        } catch (error) {
            console.log(error)
            const message = error
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export function getUsers(){
    Realm.open({schema: [sch_user]})
    .then(realm => {
            const users = realm.objects(sch_user);
            return users;
    });
}
