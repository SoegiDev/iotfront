import { createSlice } from '@reduxjs/toolkit'
import {outletListSearch} from './actions/outletAction'
import {comListSearch} from "./actions/companieAction"
import { userListSearch } from './actions/userAction'
import { productListSearch } from './actions/productsAction'
import { ESLListSearch } from './actions/eslAction'
const initialState = {
    data:null,
    pagination:null,
    isDataError: false,
    isDataSuccess: false,
    isDataLoading: true,
    message: ""
}

const dataGetSlice = createSlice({
  name: 'getSlice',
  initialState,
  reducers: {
    resetDataApi: (state) => {
      state.data = null;
      state.isDataSuccess = false;
      state.isDataError = false;
      state.isDataLoading = true;
      state.message = null;
      state.pagination = null;
    },
  },
  extraReducers:(builder) =>{
    // GET OUTLET LIST
    builder.addCase(outletListSearch.pending, (state) =>{
       state.isDataLoading = true;
        state.isDataError = false;
      });
    builder.addCase(outletListSearch.fulfilled, (state, action) =>{
      state.isDataSuccess = true;
      state.isDataLoading = false;
      state.isDataError = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(outletListSearch.rejected, (state, action) =>{
      state.isDataLoading = false;
      state.isDataSuccess = false;
      state.isDataError = true;
      state.message = action.payload;});

    // LIST COMPANIES
    builder.addCase(comListSearch.pending, (state) =>{
       state.isDataLoading = true;
        state.isDataError = false;
      });
    builder.addCase(comListSearch.fulfilled, (state, action) =>{
      state.isDataSuccess = true;
      state.isDataLoading = false;
      state.isDataError = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(comListSearch.rejected, (state, action) =>{
      state.isDataLoading = false;
      state.isDataSuccess = false;
      state.isDataError = true;
      state.message = action.payload;});

    // LIST USER SEARCH
    builder.addCase(userListSearch.pending, (state) =>{
       state.isDataLoading = true;
        state.isDataError = false;
      });
    builder.addCase(userListSearch.fulfilled, (state, action) =>{
      state.isDataSuccess = true;
      state.isDataLoading = false;
      state.isDataError = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(userListSearch.rejected, (state, action) =>{
      state.isDataLoading = false;
      state.isDataSuccess = false;
      state.isDataError = true;
      state.message = action.payload;});

  
      // LIST PRODUCT SEARCH
    builder.addCase(productListSearch.pending, (state) =>{
       state.isDataLoading = true;
        state.isDataError = false;
      });
    builder.addCase(productListSearch.fulfilled, (state, action) =>{
      state.isDataSuccess = true;
      state.isDataLoading = false;
      state.isDataError = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(productListSearch.rejected, (state, action) =>{
      state.isDataLoading = false;
      state.isDataSuccess = false;
      state.isDataError = true;
      state.message = action.payload;});

  // LIST ESL SEARCH
    builder.addCase(ESLListSearch.pending, (state) =>{
       state.isDataLoading = true;
        state.isDataError = false;
      });
    builder.addCase(ESLListSearch.fulfilled, (state, action) =>{
      state.isDataSuccess = true;
      state.isDataLoading = false;
      state.isDataError = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(ESLListSearch.rejected, (state, action) =>{
      state.isDataLoading = false;
      state.isDataSuccess = false;
      state.isDataError = true;
      state.message = action.payload;});

  },
})

export const { resetDataApi } = dataGetSlice.actions
export default dataGetSlice.reducer