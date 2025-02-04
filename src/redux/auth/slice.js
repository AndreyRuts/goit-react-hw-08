import { createSlice } from "@reduxjs/toolkit";
import { logInThunk, logOutThunk, refreshUserThunk, registerThunk } from "./operations";


const initialState = {
    user: {
        name: null,
        email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.token = action.payload.token;
            })
            .addCase(logInThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.token = action.payload.token;
            })
            .addCase(logOutThunk.fulfilled, (state) => {
                state.user = {name: null, email: null};
                state.isLoggedIn = false;
                state.token = null;
            })
            .addCase(refreshUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;        
            })
            .addCase(refreshUserThunk.pending, (state) => {
                state.isRefreshing = true;             
            })
            .addCase(refreshUserThunk.rejected, (state) => {
                state.isRefreshing = false;
            });
    },
});


export const authReducer = slice.reducer;