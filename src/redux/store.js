import { API } from './API';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    API.middleware,
  ],
});
