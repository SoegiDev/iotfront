import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080'
    : import.meta.env.VITE_SERVER_URL

// ESL GET LIST
export const ESLListSearch = createAsyncThunk(
  'api/ESLListSearch',
  async (post_data,{ rejectWithValue,getState }) => {
    console.log(post_data['query'])
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(
        `${backendURL}/device/esl/list_search?q=`+post_data['query']+`&p=`+post_data['page'],post_data['body'],config);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const eslGetListForAdd = createAsyncThunk(
  'api/eslGetListForAdd',
  async (post_data,{ rejectWithValue,getState }) => {
    console.log(post_data['query'])
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.get(
        `${backendURL}/device/esl/list_for_add?q=`+post_data['query']+`&p=`+post_data['page'],config);
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const eslShow = createAsyncThunk(
  'api/eslShow',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(
        `${backendURL}/device/esl/show`,post_data,config);
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

export const eslChange = createAsyncThunk(
  'api/eslChange',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(
        `${backendURL}/device/esl/change`,post_data,
        config);
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
