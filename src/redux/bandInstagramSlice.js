import { createSlice } from "@reduxjs/toolkit";

const slice = {
    name: 'bandInstagram',
    initialState: {
        posts: [],
    },
    reducers: {
        getPosts: (state, action) => {
            return state.posts;
        }
    },
}

const bandInstagramSlice = createSlice(slice);
export const { getBandInstagram }  = bandInstagramSlice.actions;
export default bandInstagramSlice.reducer;

export const selectBandInstagram = (state) => state.bandInstagram.posts;