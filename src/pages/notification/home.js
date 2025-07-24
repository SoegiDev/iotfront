import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CFormSwitch,CForm, CFormInput} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { useGetNotifSensorQuery } from '../../services/sensorServices';
const Collapses = () => {
    const dispatch = useDispatch()
    const [dataNotif, setDataNotif] = useState([]);
    const [sortList, setSortList] = useState([])
    const [oldcount, setoldCount] = useState(0)
    const { data:getNotif, isFetching } = useGetNotifSensorQuery("getNotif",{pollingInterval:10000});
    useEffect(() => {
    if (getNotif)
        setDataNotif(getNotif.data);
        setoldCount(dataNotif.length);
        if(dataNotif !== null){
            const items = [...dataNotif];
            const sortData=()=>{
                items.sort((a, b)=> new Date(b.created_time) - new Date(a.created_time))
                setSortList(items)
            }
            sortData();    
        }
    }, [getNotif,dataNotif,oldcount]);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>
              Notification
              </strong>
          </CCardHeader>
          <CCardBody>
          <CTable responsive>
            <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sensor</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                    </CTableRow>
            </CTableHead>
            <CTableBody>
                {sortList &&
                sortList.map((data, index) => (
                    <CTableRow key={index+1}>
                        <CTableHeaderCell scope="row">{data.created_time}</CTableHeaderCell>
                        <CTableDataCell>{data.message}</CTableDataCell>
                        <CTableDataCell>{data.name}</CTableDataCell>
                        <CTableDataCell>{data.user_owner===""?"Admin":data.user_owner}</CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default Collapses
