import actions from "./actions.js";


export const addEntry = (entry) => (dispatch) => {
	dispatch(actions.addEntry(entry));
};

export const addEntries = (entries) => (dispatch) => {
	dispatch(actions.addEntries(entries));
};
