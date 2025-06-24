import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    updateRender: false,
    target: null,
};

export const global = createSlice({
    initialState,
    name: "global",
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setUptadeRender: (state, { payload }) => {
            state.updateRender = payload;
        },
        setScrollTarget: (state, { payload }) => {
            state.target = payload;
        },
    },
});

export const { setUser, setUptadeRender, setScrollTarget } = global.actions;