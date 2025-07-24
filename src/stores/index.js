import { configureStore,combineReducers } from '@reduxjs/toolkit';
import authReducer from "../features/auths/authSlice";
import themeReducer from "../features/theme/themeSlice";
import getSliceReducer from "../features/getSlice";
import showSliceReducer from "../features/showSlice";
import pushSliceReducer from "../features/pushSlice";
import { authApi } from '../services/authService';
import { sensorFlagApi } from '../services/sensorServices';
import { dashboardApi } from '../services/dashboardService';
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     themes:themeReducer,
//     [authApi.reducerPath]: authApi.reducer,
//     [sensorFlagApi.reducerPath]: sensorFlagApi.reducer,
//     [dashboardApi.reducerPath]: dashboardApi.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat([
//       authApi.middleware, 
//       sensorFlagApi.middleware,
//       dashboardApi.middleware
//     ])
// });

const combinedReducer = combineReducers({
  auth: authReducer,
  themes:themeReducer,
  getSlice:getSliceReducer,
  showSlice: showSliceReducer,
  pushSlice: pushSliceReducer,
  [authApi.reducerPath]: authApi.reducer,
  [sensorFlagApi.reducerPath]: sensorFlagApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer
});
const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    // Return undefined to reset all slices to their initial state
    return combinedReducer(undefined, action); 
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([
    authApi.middleware, 
    sensorFlagApi.middleware,
    dashboardApi.middleware
  ])
});