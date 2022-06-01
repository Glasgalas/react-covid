import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

//начальный стейт
const initState = {
  countryList: [],
  country: 'world',
  day: '',
  totalDeath: 0,
  totalCases: 0,
  activeCases: 0,
  criticalCases: 0,
  recovered: 0,
  newCases: 0,
  newDeaths: 0,
  totalTests: 0,
};

// Slice
const dataSlice = createSlice({
  name: 'data',
  initialState: initState,
  reducers: {
    dataAll(state, action) {
      state.countryList = action.payload.countryList;
    },
    dataCountry(state, action) {
      state.country = action.payload.country;
      state.day = action.payload.day;
      state.totalCases = action.payload.totalCases;
      state.totalDeath = action.payload.totalDeath;
      state.activeCases = action.payload.activeCases;
      state.criticalCases = action.payload.criticalCases;
      state.recovered = action.payload.recovered;
      state.newCases = action.payload.newCases;
      state.newDeaths = action.payload.newDeaths;
      state.totalTests = action.payload.totalTests;
    },
  },
});

export const { dataAll, dataCountry } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;

// Selectors
export const getState = state => state.data;

// ф-ция разбивки числа по 3 знакам
function splitDecade(str) {
  if (!str) {
    return;
  }

  const str1 = str
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .join(' ');
  const str2 = [...str1];
  const str3 = str2.reverse().join('');

  return str3;
}

// Hooks
export const useData = () => {
  const dispatch = useDispatch();
  const dataValue = useSelector(getState);

  const handleDataAll = value => {
    dispatch(dataAll(value));
  };
  const handleData = value => {
    dispatch(dataCountry(value));
  };

  return {
    dataValue,
    getDataAll: handleDataAll,
    getData: handleData,
    split: splitDecade,
  };
};
