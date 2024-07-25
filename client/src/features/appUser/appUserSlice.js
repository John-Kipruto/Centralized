import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "http://localhost:8000/api"

const initialState = {
    loading: false,
    user: null,
    error: ""
}

export const authenticateAppUser = createAsyncThunk('/appUser/authenticateAppUser', () => {
    return axios
    .get(`${url}/auth`, {withCredentials: true})
    .then(response => response.data)
})

export const loginAppUSer = createAsyncThunk('/appUser/loginAppUser', (userData) => {
    return axios
    .post(`${url}/auth/login`, userData, {withCredentials: true})
    .then(response => response.data)
    .catch(error => {
        toast.error("Invalid Credentials",)
    })
})

export const registerUserWithoutProfilePhoto = createAsyncThunk('/appUser/registerUserWithoutProfilePhoto', (userData) => {
    return axios
    .post(`${url}/users`, userData, {withCredentials: true})
    .then(response => response.data)
})

export const registerUserWithProfilePhoto = createAsyncThunk('/appUser/registerUserWithProfilePhoto', (formData) => {
    return axios
    .post(`${url}/users`, formData, { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true})
    .then(response => {
        toast.success("Profile update success")
        return response.data
    })
})

export const updateUserWithNewProfilePhoto = createAsyncThunk('/appUser/updateUserWithNewProfilePhoto', (formData) => {
    const userId = formData.get("id")
    return axios
        .put(`${url}/users/${userId}`, formData, {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true})
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        })
})

export const updateUserWithOldProfilePhoto = createAsyncThunk('/appUser/updateUserWithOldProfilePhoto', (userData) => {
    console.log("In slice", userData.id)
    return axios
        .put(`${url}/users/${userData.id}`, userData, { withCredentials: true})
        .then(response => {
            toast.success("Profile update success!")
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
})

export const logoutUser = createAsyncThunk('/appUser/logoutUser', () => {
    return axios
    .delete(`${url}/auth/logout`, {withCredentials: true})
    .then(response => response.data)
})

const appUserSlice = createSlice({
    name: "appUser",
    initialState,
    extraReducers: (builder => {
        builder.addCase(authenticateAppUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(authenticateAppUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(authenticateAppUser.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message
        })

        /** Login functionality */
        builder.addCase(loginAppUSer.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginAppUSer.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(loginAppUSer.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message
        })

        /** Register user without profile photo */
        builder.addCase(registerUserWithoutProfilePhoto.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUserWithoutProfilePhoto.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(registerUserWithoutProfilePhoto.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message  
        })

         /** Register user with profile photo */
         builder.addCase(registerUserWithProfilePhoto.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUserWithProfilePhoto.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(registerUserWithProfilePhoto.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message  
        })

         /** Update user with new profile photo */
         builder.addCase(updateUserWithNewProfilePhoto.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserWithNewProfilePhoto.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(updateUserWithNewProfilePhoto.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message  
        })

         /** Update user with Old profile photo */
         builder.addCase(updateUserWithOldProfilePhoto.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserWithOldProfilePhoto.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(updateUserWithOldProfilePhoto.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message  
        })

        /**Logout user */
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false
            state.user = null
            state.error = ''
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message
        })
    })
})


export default appUserSlice.reducer