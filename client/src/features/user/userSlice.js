import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const url = "http://localhost:8000/api/users"

export const fetchAllUsers = createAsyncThunk('/user/fetchUsers', () => {
    return axios.get(url)
    .then(response => response.data)
})



const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })

       
    }
})



export default userSlice.reducer