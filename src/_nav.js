import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilIndustry,
  cilInput,
  cilSpeedometer,
  cilDevices,
  cilGroup,
  cilUser,
  cilBuilding
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: 'Client',
    to: '/companies',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Outlets',
    to: '/outlet',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Device List',
    to: '/device',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  }
]

export default _nav
