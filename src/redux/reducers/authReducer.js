// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false
    },
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;
