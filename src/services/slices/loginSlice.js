import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/loginService";

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    user: {
      userId: null,
      username: null,
    },
  },
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    logOut: state => {
      state.user = {
        userId: null,
        username: null,
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, payload) => {
        console.log("object payload fulfilled =>", payload)
        state.isFetching = false;
        state.isSuccess = true;
        // state.user.userId = payload.Body.UserId;
        // state.user.username = payload.Body.USERNAME;
      }).addCase(login.pending, state => {
        state.isFetching = true;
      }).addCase(login.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
    // Add more cases as needed
  },
  // extraReducers: {
  //   [login.fulfilled]: (state, {payload}) => {  
  //     console.log("object payload fulfilled =>",payload)    
  //     state.isFetching = false;
  //     state.isSuccess = true;
  //     state.user.userId = payload.Body.UserId;
  //     state.user.username = payload.Body.USERNAME;
  //   },
  //   [login.pending]: state => {
  //     state.isFetching = true;
  //   },
  //   [login.rejected]: (state, {payload}) => {
  //     state.isFetching = false;
  //     state.isError = true;
  //     state.errorMessage = payload.message;
  //   },
  // },
});

export const { clearState, logOut } = loginSlice.actions;
export default loginSlice.reducer;

export { login };