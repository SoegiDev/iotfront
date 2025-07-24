import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080/api'
    : import.meta.env.VITE_SERVER_URL


export const clientsGetList = createAsyncThunk(
  'api/clientsGetList',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.get(`${backendURL}/client/list?q=`+post_data['query']+`&p=`+post_data['page'],config);
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

export const clientsListForUser = createAsyncThunk(
  'api/clientsListForUser',
  async (_,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.get(`${backendURL}/client/list`,config);
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

export const clientsGetRow = createAsyncThunk(
  'api/clientsGetRow',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/client/getrow`,post_data,config);
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

export const storesByCompanyId = createAsyncThunk(
  'api/storesByCompanyId',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/stores/list?q=`+post_data['query']+`&p=`+post_data['page'],post_data['body'],config);
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

export const unitsByStoreId = createAsyncThunk(
  'api/unitsByStoreId',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/esl/list_bycompany?q=`+post_data['query']+`&p=`+post_data['page'],post_data['body'],config);
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


export const unitsByStoreIdSelect = createAsyncThunk(
  'api/unitsByStoreIdSelect',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/esl/list_bycompany`,post_data['body'],config);
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

export const clientsChange = createAsyncThunk(
  'api/clientsChange',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/change`,
         post_data,
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

export const storesGetRow = createAsyncThunk(
  'api/storesGetRow',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/stores/getrow`,
        post_data,config);
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

export const storesChange = createAsyncThunk(
  'api/storesChange',
  async (post_data,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const {data} = await axios.post(`${backendURL}/client/stores/change`,
         post_data,
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