import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilIndustry,
  cilInput,
  cilSpeedometer,
  cilDevices,
  cilGroup,
  cilUser,
  cilShareBoxed,
  cilBasket,
  cilList,
  cilUserX,
  cilUserFollow,
  cilBuilding,
  cilCloudUpload,
  cilUserFemale,
  cilUserPlus,
  cilFastfood
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Store List',
    to: '/outlet',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Own Product',
    to: '/product',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User List',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setup ESL',
    to: '/esl/setup',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'ESL Monitoring',
    to: '/esl/monitor',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
]

export default _nav
