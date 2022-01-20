// import { configureStore } from '@reduxjs/toolkit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import entriesReducer from '../ducks/entries/reducer.js';
import thunk from 'redux-thunk';

// export const store = configureStore({
//   reducer: {
//     blah: () => null
//   },
// });

export const store = createStore(
	combineReducers({
		entries: entriesReducer,
	}),
	applyMiddleware(thunk),
);