import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/authService';
import { setCredentials } from '../features/auths/authSlice';
import { CSpinner } from '@coreui/react'
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // show unauthorized screen if no user is found in redux store
  const { data, isFetching } = useGetUserDetailsQuery({pollingInterval:60000});
  useEffect(() => {
    if (data)
      dispatch(setCredentials(data))
  }, [data, dispatch]);
  if (isFetching) {
    return (
       <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
    )
  }else{
    if(userInfo === null){
      return (
        <div className='unauthorized'>
          <h1>Unauthorized :(</h1>
          <span>
            <NavLink to='/login'>Login</NavLink> to gain access
          </span>
        </div>
      )
    }
  }
  return <Outlet />
}

export default ProtectedRoute
