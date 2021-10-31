import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fetchTags } from './tagAPI';
import type { TagType } from './TagType';

export interface CounterState {
  tags: TagType[];
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
    setTags: (state, action: PayloadAction<TagType[]>) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = tagSlice.actions;

export const selectTags = (state: RootState) => state.tag.tags;

export default tagSlice.reducer;
