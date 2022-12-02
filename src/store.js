import { configureStore } from "@reduxjs/toolkit";

// store imports, like:
// import todosReducer from 'todosreducerpath'
import bandInstagramReducer from "./redux/bandInstagramSlice";

const store = configureStore({
	reducer: {
		//put reducers here, like 'todos: todosReducer
		bandInstagrams: bandInstagramReducer,
	},
});

export default store;
