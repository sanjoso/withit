import { createSlice } from "@reduxjs/toolkit";

const slice = {
	name: "choice",
	initialState: {
		choice: "",
	},
	reducers: {
		chooseSubscription: (state, action) => {
			state.choice = action.payload;
		},
	},
};

const choiceSlice = createSlice(slice);
export const { chooseSubscription } = choiceSlice.actions;
export const selectChoice = (state) => state.choice.choice;
export default choiceSlice.reducer;
