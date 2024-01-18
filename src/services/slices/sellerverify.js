import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

/* 
[{"dl_no": "Hdhsbs", "email": "Rakesh.ponna@regalrexnord.com", "f_name": "Rakkghh", "image":
 {"back": "file:///data/user/0/com.thriftydemo/cache/rn_image_picker_lib_temp_c3b86dc6-27ac-43b9-948d-d5a0ce7c720f.jpg",
 "front": "file:///data/user/0/com.thriftydemo/cache/rn_image_picker_lib_temp_d2f7efaa-5584-4ea7-ac4e-1b70f8a4ef9a.jpg"}, 
 "l_name": "Nndndnn", "mobile": "594949799", "userType": "seller", "user_id": "65a2c252f21e21275faaa121"}]
*/

export const sellerVerifySlice = createSlice({
    name: 'sellerverify',
    initialState,
    reducers: {
        clearState: state => {
            return [];
          },
          addToSellerVerify(state, { payload }) {
            console.log(payload)
            state.push(payload);
            // state.push({
            //     ...payload,
            // });
        },
    },
    
});

// Action creators are generated for each case reducer function
export const { clearState,addToSellerVerify} = sellerVerifySlice.actions;
export default sellerVerifySlice.reducer;