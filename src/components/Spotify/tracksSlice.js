import { createSlice } from "@reduxjs/toolkit";

const slice = {
	name: "tracks",
	initialState: [],
	reducers: {},
};

const tracksSlice = createSlice(slice);
export default tracksSlice.reducer;
