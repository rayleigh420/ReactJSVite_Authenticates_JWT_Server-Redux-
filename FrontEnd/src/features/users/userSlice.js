import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
    user: {},
    status: 'idle',
    error: null
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
                console.log(state.user)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
    }
})

export const login = createAsyncThunk('users/login', async (data) => {
    try {
        const response = await axios.post("/signIn",
            {
                email: data.email,
                password: data.password
            },
            {
                withCredentials: true
            }
        );

        return response.data
    } catch (e) {
        return e.message
    }
})

export const getUser = (state) => state.user
export const getStatus = (state) => state.status
export const getError = (state) => state.error


export default userSlice.reducer