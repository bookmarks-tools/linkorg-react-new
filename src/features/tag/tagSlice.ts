import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CounterState {
  tags: any[];
}

const initialState: CounterState = {
  tags: [],
};

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
