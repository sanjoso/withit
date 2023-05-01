import { createSlice } from "@reduxjs/toolkit";

const slice = {
	name: "choice",
	initialState: {
		choice: "",
	},
	reducers: {
		BVYouTubeChooseSubscription: (state, action) => {
			state.choice = action.payload;
		},
	},
};

const BVYouTubeChoiceSlice = createSlice(slice);
export const { BVYouTubeChooseSubscription } = BVYouTubeChoiceSlice.actions;
export const selectBVYouTubeChoice = (state) => state.BVYouTubeChoice.choice;
export default BVYouTubeChoiceSlice.reducer;
