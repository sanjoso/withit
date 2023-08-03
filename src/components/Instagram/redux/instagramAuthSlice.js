import { createSlice } from "@reduxjs/toolkit";

const slice = {
	name: "instagramAuth",
	initialState: {
		code: "",
		accessToken: "",
	},
	reducers: {
		storeInstagramCode: (state, action) => {
			state.code = action.payload;
		},
		storeInstagramToken: (state, action) => {
			state.accessToken = action.payload;
		},
	},
};

export const instagramAuthSlice = createSlice(slice);
export const { storeInstagramCode } = instagramAuthSlice.actions;
