import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fetchTags } from './tagAPI';

export interface CounterState {
  tags: any[];
}

const initialState: CounterState = {
  tags: [],
};

export const getTags = createAsyncThunk('tag/fetchTags', async (_, thunkAPI) => {
  const response = await fetchTags();
  thunkAPI.dispatch(setTags(response.data));
  return response.data;
});

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<any[]>) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = tagSlice.actions;

export const selectTags = (state: RootState) => state.tag.tags;

export default tagSlice.reducer;
