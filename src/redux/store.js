import { configureStore } from '@reduxjs/toolkit';
import termsReducer from './slices/terms.js';


export const store = configureStore({
  reducer: {
    terms: termsReducer,
  },
});
