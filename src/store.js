import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./Reducers/LoginRducers";
import { useReducer } from "react";
import { userReducer } from "./Reducers/UserReducer";

export const store = configureStore({
    reducer:{
        loginReducer,
        userReducer
    }
})