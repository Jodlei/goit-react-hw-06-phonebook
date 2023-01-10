import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilterContacts(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setFilterContacts } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
