import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getData: build.query({
      query: () => ({
        url: '/dashboard/dash_team',
        method: 'GET',
      }),
    })
  }),
})

// export react hook
export const { useGetDataQuery } = dashboardApi