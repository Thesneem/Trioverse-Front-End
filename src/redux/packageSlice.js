import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],

};
const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
        setPackages: (state, action) => {
            state.packages = action.payload
            console.log('HI Slice', state.packages)
        },
    },
});

export const { setPackages } = packageSlice.actions;

export default packageSlice.reducer;