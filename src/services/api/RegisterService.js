import Realm from 'realm';
import {createAsyncThunk} from '@reduxjs/toolkit';
import realmSchema, {  sch_user } from '../../database/RealmConfig';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()
export const register = createAsyncThunk(
    '/register',
    async (data, thunkAPI) => {
      try {
       let userDetails = realmSchema.objects(sch_user);
       let isEmailExists = userDetails.some(userMail => userMail.email.toLowerCase() == data.email.toLowerCase())
        if(!isEmailExists){
          let res =  realmSchema.write(() => {
            var ID  = new Realm.BSON.ObjectId()
            console.log(ID)
                  realmSchema.create(sch_user, {
                  id: ID.toString(),
                  first_name: data.firstname,
                  last_name: data.lastname,
                  email: data.email,
                  password: data.password,
                  role: data.role,
                  avatar: data.avatar,
                });
            })
            console.log("register => ",res)
            let response  = {
                status : "Success",
                message: "User registered successfully.",
            }
            return thunkAPI.fulfillWithValue(response);
        }else{
            let response  = {
                status : "Failure",
                message: "Provided email id already exists.",
            }
            return thunkAPI.fulfillWithValue(response);
        }
      } catch (error) {
        const message =error
        return thunkAPI.rejectWithValue(message);
      }
    },
  );
  