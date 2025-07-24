import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080'
    : import.meta.env.VITE_SERVER_URL


export const outletListSearch = createAsyncThunk(
  'api/outletListSearch',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/outlet/list_search?q=`+post_data['query']+`&p=`+post_data['page'],post_data['body'],config);
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

export const outletAdd = createAsyncThunk(
  'api/outletAdd',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/outlet/create`,post_data['body'],config);
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

export const outletShow = createAsyncThunk(
  'api/outletShow',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/outlet/show`,post_data['body'],config);
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

export const outletChange = createAsyncThunk(
  'api/outletChange',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/outlet/change`,post_data['body'],config);
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
