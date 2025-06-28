import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag');
  return response.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    filteredCountries: [],
    status: 'idle',
    error: null,
    visibleCount: 12,
    filterRegion: 'All',
  },
  reducers: {
    loadMore: (state) => {
      state.visibleCount += 12;
    },
    filterByRegion: (state, action) => {
      state.filterRegion = action.payload;
      state.visibleCount = 12;
      if (action.payload === 'All') {
        state.filteredCountries = state.countries;
      } else {
        state.filteredCountries = state.countries.filter(c => c.region === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { loadMore, filterByRegion } = countriesSlice.actions;
export default countriesSlice.reducer;
