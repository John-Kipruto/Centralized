import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import appUserReducer from "../features/appUser/appUserSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        appUser: appUserReducer
    }
})

export default store