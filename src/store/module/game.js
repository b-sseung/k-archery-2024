import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  gmMth: 'AR001', //컴파운드 AR002
  gmId: '',
  gmYear: '',
  gmSex: 'W', //남자 M
  gmRound: '',
  gmRoundDetailType: '',
  gmSubRound: '',
  gmMatNo: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGmId: (state, action) => {
      return {
        ...state,
        gmId: action.payload,
      };
    },
    setGmYear: (state, action) => {
      return {
        ...state,
        gmYear: action.payload,
      };
    },
    setGmRound: (state, action) => {
      return {
        ...state,
        gmRound: action.payload,
      };
    },
    setGmRoundDetailType: (state, action) => {
      return {
        ...state,
        gmRoundDetailType: action.payload,
      };
    },
    setGmSubRound: (state, action) => {
      return {
        ...state,
        gmSubRound: action.payload,
      };
    },
  },
});

export const { setGmId, setGmYear, setGmRound, setGmRoundDetailType, setGmSubRound, toggleModerator } = gameSlice.actions;
export default gameSlice.reducer;
