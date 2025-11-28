import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    updateRender: false,
    target: null,
    loading: false,
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
        setLoading: (state, { payload }) => {
            state.loading = payload;
        }
    },
});

export const { setUser, setUptadeRender, setScrollTarget, setLoading } = global.actions;