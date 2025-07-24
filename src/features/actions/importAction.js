import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080'
    : import.meta.env.VITE_SERVER_URL


export const importOutlet = createAsyncThunk(
  'api/importOutlet',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/add_outlet`,formData,config);
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

export const importUser = createAsyncThunk(
  'api/importUser',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/add_user`,formData,config);
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

export const importProduct = createAsyncThunk(
  'api/importProduct',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/add_product`,formData,config);
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

export const importContent = createAsyncThunk(
  'api/importContent',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/add_content`,formData,config);
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

export const cancelImportStore = createAsyncThunk(
  'api/cancelImportStore',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/cancel_import`,formData,config);
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

export const saveImportStore = createAsyncThunk(
  'api/saveImportStore',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/save_import_outlet`,formData,config);
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

export const saveImportUser = createAsyncThunk(
  'api/saveImportUser',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/save_import_user`,formData,config);
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

export const saveImportProduct = createAsyncThunk(
  'api/saveImportProduct',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/save_import_product`,formData,config);
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

export const saveUpdateContent = createAsyncThunk(
  'api/saveUpdateContent',
  async (formData,{ rejectWithValue,getState }) => {
    try {
      const token = getState().auth.userToken
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "x-access-token":token
        },
      }
      const { data} = await axios.post(`${backendURL}/import/save_update_content`,formData,config);
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
