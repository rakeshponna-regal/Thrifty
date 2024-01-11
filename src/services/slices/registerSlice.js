import { createSlice } from "@reduxjs/toolkit";
import { register } from "../api/RegisterService";

export const registerSlice = createSlice({
  name: 'register',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, payload) => {
        console.log("object payload fulfilled =>", payload)
        state.isFetching = false;
        state.isSuccess = true;
      }).addCase(register.pending, state => {
        state.isFetching = true;
      }).addCase(register.rejected, (state, payload) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
  },
});

export const { clearState } = registerSlice.actions;
export default registerSlice.reducer;

export { register };