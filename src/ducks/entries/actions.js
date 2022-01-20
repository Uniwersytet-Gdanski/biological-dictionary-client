import actionCreator from "../../utils/actionCreator";
import {
	ENTRIES_ADD_ONE,
	ENTRIES_ADD_MANY,
	ENTRIES_MARK_AS_NONEXISTING,
} from "./types.js";


const addEntry = (newEntry) => (actionCreator(ENTRIES_ADD_ONE, newEntry));

const addEntries = (newEntrys) => (actionCreator(ENTRIES_ADD_MANY, newEntrys));

const markEntryIdAsNonexisting = (entryId) => (actionCreator(ENTRIES_MARK_AS_NONEXISTING, entryId));

const actions = {
	  addEntry,
	  addEntries,
	  markEntryIdAsNonexisting,
};

export default actions;

