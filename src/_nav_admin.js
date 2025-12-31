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
  cilFastfood,
  cilCommand
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
    name: 'User List',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Import Data',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Import User',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
        to: '/import/user',
      },
      {
        component: CNavItem,
        name: 'Import Outlet',
        icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
        to: '/import/outlet',
      },
      {
        component: CNavItem,
        name: 'Import Content',
        icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
        to: '/import/content',
      },
    ]
  },
  {
    component: CNavItem,
    name: 'Setup ESL',
    to: '/device',
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
