import {createSlice} from '@reduxjs/toolkit';

const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      return payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const getUser = (state) => (state.user);

export default userSlice.reducer;
