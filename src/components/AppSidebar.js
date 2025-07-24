import React ,{ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { show } from '../features/theme/themeSlice';
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'

import logo_web from 'src/assets/images/Avistech.png'
// sidebar nav config
import nav_team from '../_nav'
import nav_staff from '../_nav_staff'
import nav_admin from '../_nav_admin'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.themes.sidebarShow)
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const profile = useSelector((state) => state.auth.userInfo)
  const [adminTeam,setAdminTeam] = useState(["superadmin","supportTeam","adminTeam"])
  const [adminStore,setAdminStore] = useState(["admin"])
  return (
    
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({type: 'themes',sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
         <img className="img-fluid" src={logo_web} width="200px" height="32px" alt="Aviskara Inc" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(show())}
        />
      </CSidebarHeader>
      <div className="text-center">
        <CCard>
          <CCardBody>
            {profile && profile.user_account?
             <CCardText>
              {profile && profile.user_account.company.company_name}
            </CCardText>:
            "SUPERADMIN"
            }
           
          </CCardBody>
        </CCard>
      </div>
      {
      adminTeam.indexOf(userRole) === 0 ?(
      <AppSidebarNav items={nav_team} /> ):
      adminStore.indexOf(userRole) === 0 ?(
      <AppSidebarNav items={nav_admin} /> ):
      (
      <AppSidebarNav items={nav_staff} /> 
      )
      }

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch(show())}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
