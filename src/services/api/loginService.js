import Realm from 'realm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import realmSchema, { sch_user } from '../../database/RealmConfig';

export const login = createAsyncThunk(
    '/login',
    async (data, thunkAPI) => {
        try {
            let userDetails = realmSchema.objects(sch_user);
            console.log(userDetails)
            let isEmailExists = userDetails.some(userMail => userMail.email.toLowerCase() == data.email.toLowerCase())
            if (isEmailExists) {
                let exisingUser = userDetails.map((user) => {
                    if (user.email.toLowerCase() == data.email.toLowerCase()) {
                        return user;
                    }
                })
                if (exisingUser.length) {
                    let user = exisingUser[0]
                    if (user.email.toLowerCase() == data.email.toLowerCase()) {
                        if (user.email.toLowerCase() == data.email.toLowerCase() &&
                            user.password == data.userPassword) {
                            let response = {
                                status: "Success",
                                message: "User Logged In Successfully.",
                                data: user
                            }
                            return thunkAPI.fulfillWithValue(response);
                        } else {
                            console.log("user ", user)
                            let response = {
                                status: "Failure",
                                message: "Invalid password. Please try again.",
                                data: undefined
                            }
                            return thunkAPI.fulfillWithValue(response);
                        }
                    }
                }
            } else {
                let response = {
                    status: "Failure",
                    message: "Invalid email. Please try again.",
                    data: undefined
                }
                return thunkAPI.fulfillWithValue(response);
            }
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
