import { configureStore } from "@reduxjs/toolkit";
import {global} from "./slices/global";

export const store = configureStore({
    reducer: {
        [global.name]: global.reducer,
    },
});