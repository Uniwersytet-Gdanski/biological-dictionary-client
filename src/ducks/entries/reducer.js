import reducerCreator from "../../utils/reducerCreator";
import {
	ENTRIES_ADD_ONE,
	ENTRIES_ADD_MANY,
} from "./types.js";

const entriesReducer = reducerCreator({}, {
	[ENTRIES_ADD_ONE]: (state, newEntry) => ({
		...state,
		[newEntry.id]: newEntry,
	}),
	[ENTRIES_ADD_MANY]: (state, newEntries) => ({
		...state,
		...newEntries,
	}),
});

export default entriesReducer;
