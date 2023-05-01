import { createSlice } from "@reduxjs/toolkit";

const slice = {
	name: "choice",
	initialState: {
		choice: "",
	},
	reducers: {
		BVSpotifyChooseSubscription: (state, action) => {
			state.choice = action.payload;
		},
	},
};

const BVSpotifyChoiceSlice = createSlice(slice);
export const { BVSpotifyChooseSubscription } = BVSpotifyChoiceSlice.actions;
export const selectBVSpotifyChoice = (state) => state.BVSpotifyChoice.choice;
export default BVSpotifyChoiceSlice.reducer;
