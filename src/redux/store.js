import { configureStore } from '@reduxjs/toolkit';
import termsReducer from './slices/terms.js';
import termsFirstLettersReducer from './slices/termsFirstLetters.js';


export const store = configureStore({
  reducer: {
    terms: termsReducer,
	termsFirstLetters: termsFirstLettersReducer,
  },
});
