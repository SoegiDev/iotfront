import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './authAction'

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const wallRole = {
    superadmin: ["superadmin"],
    adminTeam:["superadmin","adminTeam"],
    supportTeam: ["superadmin","adminTeam","supportTeam"],
    admin:["admin"],
    clientSupport:["manager","supervisor"]
}

const initialState = {
    wallRole: wallRole,
    userInfo: null,
    username: null,
    userToken,
    isLogin: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    data:null,
    message: ""
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.isLoading = false;
      state.username = null;
      state.userInfo = null;
      state.userToken = null;
      state.isError = false;
      state.isLogin = false;
      state.data = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      state.username = payload.username;
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = true;
    },
  },
  extraReducers:(builder) =>{
    builder.addCase(userLogin.pending, (state) =>{
      state.isLoading = true;
      state.isError = false;});
    builder.addCase(userLogin.fulfilled, (state, action) =>{
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = true;
      state.message = action.payload.message;
      state.userToken = action.payload.token;
      console.log(action)
    });
    builder.addCase(userLogin.rejected, (state, action) =>{
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;});

  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer