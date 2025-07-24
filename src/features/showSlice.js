import { createSlice } from '@reduxjs/toolkit'
import { outletShow} from './actions/outletAction'
import { comShow } from './actions/companieAction'
import { userShow } from './actions/userAction'
import { productShow } from './actions/productsAction'
import { eslShow } from './actions/eslAction'

const initialState = {
    dataShow:null,
    isShowError: false,
    isShowSuccess: false,
    isShowLoading: false,
    message: ""
}

const dataShowSlice = createSlice({
  name: 'dataShowSlice',
  initialState,
  reducers: {
    resetShowApi: (state) => {
      state.dataShow = null;
      state.isShowSuccess = false;
      state.isShowError = false;
      state.isShowLoading = false;
    },
  },
  extraReducers:(builder) =>{

    // GET OUTLET
    builder.addCase(outletShow.pending, (state) =>{
      state.isShowLoading = true;
      state.isShowError = false;});
    builder.addCase(outletShow.fulfilled, (state, action) =>{
      state.isShowSuccess = true;
      state.isShowLoading = false;
      state.isShowError = false;
      state.message = action.payload.message;
      state.dataShow = action.payload;});
    builder.addCase(outletShow.rejected, (state, action) =>{
      state.isShowLoading = false;
      state.isShowSuccess = false;
      state.isShowError = true;
    state.message = action.payload;});

    // GET COMPANIES SHOW
    builder.addCase(comShow.pending, (state) =>{
      state.isShowLoading = true;
      state.isShowError = false;});
    builder.addCase(comShow.fulfilled, (state, action) =>{
      state.isShowSuccess = true;
      state.isShowLoading = false;
      state.isShowError = false;
      state.message = action.payload.message;
      state.dataShow = action.payload;});
    builder.addCase(comShow.rejected, (state, action) =>{
      state.isShowLoading = false;
      state.isShowSuccess = false;
      state.isShowError = true;
    state.message = action.payload;});

    // USER SHOW
    builder.addCase(userShow.pending, (state) =>{
      state.isShowLoading = true;
      state.isShowError = false;});
    builder.addCase(userShow.fulfilled, (state, action) =>{
      state.isShowSuccess = true;
      state.isShowLoading = false;
      state.isShowError = false;
      state.message = action.payload.message;
      state.dataShow = action.payload;});
    builder.addCase(userShow.rejected, (state, action) =>{
      state.isShowLoading = false;
      state.isShowSuccess = false;
      state.isShowError = true;
    state.message = action.payload;});

    // PRODUCT SHOW
    builder.addCase(productShow.pending, (state) =>{
      state.isShowLoading = true;
      state.isShowError = false;});
    builder.addCase(productShow.fulfilled, (state, action) =>{
      state.isShowSuccess = true;
      state.isShowLoading = false;
      state.isShowError = false;
      state.message = action.payload.message;
      state.dataShow = action.payload;});
    builder.addCase(productShow.rejected, (state, action) =>{
      state.isShowLoading = false;
      state.isShowSuccess = false;
      state.isShowError = true;
    state.message = action.payload;});

    // ESL SHOW
    builder.addCase(eslShow.pending, (state) =>{
      state.isShowLoading = true;
      state.isShowError = false;});
    builder.addCase(eslShow.fulfilled, (state, action) =>{
      state.isShowSuccess = true;
      state.isShowLoading = false;
      state.isShowError = false;
      state.message = action.payload.message;
      state.dataShow = action.payload;});
    builder.addCase(eslShow.rejected, (state, action) =>{
      state.isShowLoading = false;
      state.isShowSuccess = false;
      state.isShowError = true;
    state.message = action.payload;});

  },
})

export const { resetShowApi } = dataShowSlice.actions
export default dataShowSlice.reducer