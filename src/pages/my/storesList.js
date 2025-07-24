import React, { useEffect, useState } from 'react';
import { Link,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CPagination,
  CPaginationItem} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { storesByCompanyId } from '../../features/actions/clientsAction';
import { cilDevices, cilLibrary, cilListNumbered, cilPencil, cilPlus } from '@coreui/icons';
import { resetDataApi } from '../../features/getApi';
const Collapses = () => {
  const dispatch = useDispatch();
  const [getPages, setPages] = useState(1)
  const [storeList,setlistStore] = useState([])
  const [getQuery, setQuery] = useState("")
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getApi);
  const companyId = useSelector((state) => state.auth.userInfo.companyList[0])
  useEffect(() =>{
    dispatch(storesByCompanyId({"query":getQuery,"page":getPages,"body":{"company_id":companyId.id}}))
  },[getQuery,getPages,dispatch]);
  useEffect(() => {
    if (!isDataLoading){
      console.log("loading "+isDataLoading)
      console.log("error "+isDataError)
      console.log("pagination "+pagination)
      console.log("success "+isDataSuccess)
      console.log("message "+dataMessage)
      console.log("query "+getQuery)
      console.log("Pages "+getPages)
      setlistStore(data)
    }
  }, [data, isDataLoading, isDataError,pagination, isDataSuccess, dataMessage, getPages, getQuery]);
  useEffect(() => {
      dispatch(storesByCompanyId({"query":getQuery,"page":getPages,"body":{"company_id":companyId.id}}))
  }, [getPages,getQuery,dispatch]);
  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>
              Store List
              </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={4}>
              </CCol>
              <CCol xs={4}>
              </CCol>
              <CCol xs={4} className='align-self-end'>
                <CFormInput
                    type="text"
                    name="query_search"
                    size="sm"
                    placeholder="Search"
                    onChange={(e) => handleChange(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                </CFormInput>
              </CCol>
            </CRow>
             {
             isDataLoading ?
            <div className="text-center">
              <CSpinner size='lg'/>
            </div>:
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                    <CTableHeaderCell scope="col"><CIcon icon={cilDevices} className="text-success" size="md" /></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  <CTableBody>
                    {storeList &&
                      storeList.map((data, idx) => (
                      <CTableRow key={idx+1}>
                        <CTableDataCell>{data.store_name} </CTableDataCell>
                        <CTableDataCell>{data.store_address} </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/client/stores/esl/${data.id}/${data.company_id}/${data.store_name}`}>
                                <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilLibrary} className="text-success" size="md" />Units</CButton>
                          </Link>
                          </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/client/stores/addesl/${data.id}/${data.company_id}/${companyId.company_name}/${data.store_name}`}>
                                <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilPlus} className="text-success" size="md" />Units</CButton>
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/client/stores/show/${data.id}/${data.company_id}`}>
                              <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilPencil} className="text-success" size="md" />Edit</CButton>
                          </Link>
                          </CTableDataCell>
                      </CTableRow>
                      ))}
                    </CTableBody>
              </CTable>
            }
            <div>
              <div>Total : {storeList && storeList.length}</div>
              <CPagination align="end"  aria-label="Page navigation example">
                  {(() => {
                    let hal_page = []
                    let total_page = pagination && pagination.total_page
                    for (let i = 0; i < total_page; i++) {
                      hal_page.push(<CPaginationItem active={pagination && pagination.current_page == i+1 ? true:false}  key={i+1} onClick={clickMe(i+1)}>{i+1}</CPaginationItem>)
                    }
                    return hal_page
                  })()}
                  
              </CPagination>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Collapses
