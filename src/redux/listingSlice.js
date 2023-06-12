import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listing: null,

};
const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        setListingDetails: (state, action) => {
            state.listing = action.payload
            console.log('HI ListingSlice', state.listing)
        },
    },
});

export const { setListingDetails } = listingSlice.actions;

export default listingSlice.reducer;