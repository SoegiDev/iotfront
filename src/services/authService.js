import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../features/auths/authSlice'
const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080'
    : import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({
baseUrl: baseUrl,
prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken
    if (token) {
      headers.set('x-access-token', `${token}`)
    }
    return headers
 }
});

// deploy //

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
      //api.dispatch(logout())
      //console.log("Authorization Failed")
    }else{
      console.log("Get Profile "+result.data)
      api.dispatch(setCredentials(result.data))
    }
    return result
  }
export const authApi = createApi({
  reducerPath: 'authProfile',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET'
      }),
    })
  }),
})

// export react hook
export const { useGetUserDetailsQuery,useGetSensorPushsQuery } = authApi