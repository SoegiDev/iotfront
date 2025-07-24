import React, { useEffect, useState } from "react";
import {CSpinner} from '@coreui/react';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../../views/widgets/WidgetsBrand'
import WidgetsDropdown from '../../views/widgets/WidgetCount'
import MainChart from './mainChart'
import { useGetDataQuery } from '../../services/dashboardService';
import { data } from "autoprefixer";
const Dashboard = () => {
  const [user_month,set_user_month] = useState([])
  const [user_count,set_user_count] = useState([])
  const [outlet_month,set_outlet_month] = useState([])
  const [outlet_count,set_outlet_count] = useState([])
  const [product_month,set_product_month] = useState([])
  const [product_count,set_product_count] = useState([])
  const [user_all,set_user_all] = useState(0)
  const [user_prev,set_user_prev] = useState(0)
  const [user_now,set_user_now] = useState(0)
  const [outlet_all,set_outlet_all] = useState(0)
  const [outlet_prev,set_outlet_prev] = useState(0)
  const [outlet_now,set_outlet_now] = useState(0)
  const [product_all,set_product_all] = useState(0)
  const [product_prev,set_product_prev] = useState(0)
  const [product_now,set_product_now] = useState(0)
  const [user_percentage,set_user_percentage] = useState(0)
  const [outlet_percentage,set_outlet_percentage] = useState(0)
  const [product_percentage,set_product_percentage] = useState(0)
  const { data:dash, isLoading, error } = useGetDataQuery(undefined, {
        pollingInterval: 5000, // Refetch data every 5 seconds
        skipPollingIfUnfocused: false, // Optional: skip polling if window is not focused
      });
  useEffect(() => {
    console.log()
    set_user_month([])
    set_user_count([])
    set_outlet_month([])
    set_outlet_count([])
    set_product_month([])
    set_product_count([])
    dash && dash.user !== null && dash.user.data.map((item, index) => (
      set_user_month(prevArray => [...prevArray, item['month']]),
      set_user_count(prevCountArr => [...prevCountArr,item['count']])
    ))
    dash && dash.outlet !== null && dash.outlet.data.map((item, index) => (
      set_outlet_month(prevArray => [...prevArray, item['month']]),
      set_outlet_count(prevCountArr => [...prevCountArr,item['count']])
    ))
    dash && dash.product !== null && dash.product.data.map((item, index) => (
      set_product_month(prevArray => [...prevArray, item['month']]),
      set_product_count(prevCountArr => [...prevCountArr,item['count']])
    ))
    if (dash && dash.user !== null )
      set_user_all(dash && dash.user && dash.user.total_all)
      set_user_prev(dash && dash.user && dash.user.prev_month_total)
      set_user_now(dash && dash.user && dash.user.now_month_total)
      set_user_percentage(dash && dash.user && dash.user.percentage)
    if (dash && dash.outlet !== null)
      set_outlet_all(dash && dash.outlet && dash.outlet.total_all)
      set_outlet_prev(dash && dash.outlet && dash.outlet.prev_month_total)
      set_outlet_now(dash && dash.outlet && dash.outlet.now_month_total)
      set_outlet_percentage(dash && dash.outlet && dash.outlet.percentage)
    if (dash && dash.product !== null)
      set_product_all(dash && dash.product && dash.product.total_all)
      set_product_prev(dash && dash.product && dash.product.prev_month_total)
      set_product_now(dash && dash.product && dash.product.now_month_total)
      set_product_percentage(dash && dash.product && dash.product.percentage)
  },[dash])
  return (
    <>
    {
      isLoading ?
      <div className="text-center">
        <CSpinner size='lg'/>
      </div>: dash ? 
      <WidgetsDropdown className="mb-4" 
      userMonth={user_month} 
      userCount={user_count} 
      userTotal={user_all} 
      userPrev={user_prev} 
      userNow={user_now} 
      userPercentage={user_percentage} 
      outletMonth={outlet_month} 
      outletCount={outlet_count} 
      outletTotal={outlet_all} 
      outletPrev={outlet_prev} 
      outletNow={outlet_now} 
      outletPercentage={outlet_percentage}
      productMonth={product_month} 
      productCount={product_count} 
      productTotal={product_all} 
      productPrev={product_prev} 
      productNow={product_now} 
      productPercentage={product_percentage}
      />:""
    }

    </>
  )
}

export default Dashboard