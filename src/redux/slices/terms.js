import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    addTerm: (state, { payload }) => {
      state[payload.id] = payload;
    },
    addTerms: (state, { payload }) => {
      for (const term of payload) {
        state[term.id] = term;
      }
    },
    markTermIdAsNonexistent: (state, { payload }) => {
      state[payload] = null;
    },
  },
});

export const { addTerm, addTerms, markTermIdAsNonexistent } = termsSlice.actions;

export const getTermById = (id) => (state) => (state.terms[id]);

export default termsSlice.reducer;
