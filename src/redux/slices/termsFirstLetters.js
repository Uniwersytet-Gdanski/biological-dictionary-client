import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: undefined,
  error: undefined,
  isLoading: true,
};

export const termsFirstLettersSlice = createSlice({
  name: 'termsFirstLetters',
  initialState,
  reducers: {
    setTermsFirstLetters: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    setErrorTermsFirstLetters: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    }
  },
});

export const { setTermsFirstLetters, setErrorTermsFirstLetters } = termsFirstLettersSlice.actions;

export const getTermsFirstLettersState = (state) => (state.termsFirstLetters);

export default termsFirstLettersSlice.reducer;
