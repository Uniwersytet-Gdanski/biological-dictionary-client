import actions from "./actions.js";




const addEntry = (entry) => (dispatch) => (
	dispatch(actions.addEntry(entry))
);

const addEntries = (entries) => (dispatch) => (
	dispatch(actions.addEntries(entries))
);

const markEntryIdAsNonexisting = (entryId) => (dispatch) => (
	dispatch(actions.markEntryIdAsNonexisting(entryId))
);

const operations = {
	addEntry,
	addEntries,
	markEntryIdAsNonexisting,
};

export default operations;
