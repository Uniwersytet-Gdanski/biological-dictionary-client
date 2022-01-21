// import { configureStore } from '@reduxjs/toolkit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import termsReducer from '../slices/terms.js';
import thunk from 'redux-thunk';

// export const store = configureStore({
//   reducer: {
//     blah: () => null
//   },
// });

export const store = createStore(
	combineReducers({
		terms: termsReducer,
	}),
	applyMiddleware(thunk),
);