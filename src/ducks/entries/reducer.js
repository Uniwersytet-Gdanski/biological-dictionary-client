import reducerCreator from "../../utils/reducerCreator";
import {
	ENTRIES_ADD_ONE,
	ENTRIES_ADD_MANY,
	ENTRIES_MARK_AS_NONEXISTING,
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
	[ENTRIES_MARK_AS_NONEXISTING]: (state, entryId) => ({
		...state,
		[entryId]: null,
	}),
});

export default entriesReducer;
