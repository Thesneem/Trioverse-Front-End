import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requirement: '',
    file: null

};
const requirementsSlice = createSlice({
    name: "requirements",
    initialState,
    reducers: {
        setRequirement: (state, action) => {
            state.requirement = action.payload
            console.log('RequirementSlice', state.requirement)
        },
        setFile: (state, action) => {
            state.file = action.payload
            console.log('FileSlice', state.file)
        }
    },
});

export const { setRequirement, setFile } = requirementsSlice.actions;


export default requirementsSlice.reducer;