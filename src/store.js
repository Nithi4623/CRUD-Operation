import {configureStore} from '@reduxjs/toolkit';
// import DetailsSlice from './slices/Details.js';
import DetailsSlice from './slices/Details.js';


export const store = configureStore({
  reducer: {           // combine all reducers into one root reducer
    // DetailsSlice,
    DetailsSlice

  },
});              