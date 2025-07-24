import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8080/'
    : import.meta.env.VITE_SERVER_URL

const baseQuery = fetchBaseQuery({
baseUrl: baseUrl,
prepareHeaders: (headers, { getState }) => {
    const username = getState().auth.username
    const token = getState().auth.userToken
    if (token) {
      headers.set('x-access-token', `${token}`)
      headers.set('x-username', `${username}`)
    }
    return headers
 }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
      //api.dispatch(logout())
      console.log("Authorization Failed")
  }else{
    //api.dispatch(setCredentials(result.data.data))
  }
  return result
  }
export const sensorFlagApi = createApi({
  reducerPath: 'sensorgetNotif',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getNotifSensor: build.query({
      query: () => ({
        url: 'admin_get_notif',
        method: 'GET',
      }),
    })
  }),
})

// export react hook
export const { useGetNotifSensorQuery } = sensorFlagApi