import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080'
    : import.meta.env.VITE_SERVER_URL

export const userListSearch = createAsyncThunk(
  'api/userListSearch',
  async (post,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/user/list_search?q=`+post['query']+`&p=`+post['page'],post['body'],config);
       return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userShow = createAsyncThunk(
  'api/userShow',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/user/show`,post_data['body'],config);
      return data
    } catch (error) {
      // return custom error message from API if any
      console.log("ERROR "+error.response.data.message)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userChange = createAsyncThunk(
  'api/userChange',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/user/change`,post_data['body'],config);
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userCreate = createAsyncThunk(
  'api/userCreate',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/user/create`,post_data['body'],config);
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)