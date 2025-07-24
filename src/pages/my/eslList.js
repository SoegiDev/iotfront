import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
CPagination, CPaginationItem,CFormInput} from '@coreui/react';
  
import { useDispatch, useSelector } from "react-redux";
import { unitsByStoreId } from '../../features/actions/clientsAction';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';
const Collapses = () => {
  const dispatch = useDispatch();
  const [getPages, setPages] = useState(1)
  const [eslList,setListESL] = useState([])
  const [getQuery, setQuery] = useState("")
  const company = useSelector((state) => state.auth.userInfo.companyList[0])
  const { data , isDataLoading, isDataError,pagination, isDataSuccess, message : dataMessage} = useSelector((state) => state.getApi);
  useEffect(() =>{
    dispatch(unitsByStoreId({"query":getQuery,"page":getPages,"body":{"company_id":company.id}}))
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
      setListESL(data)
    }
  }, [data, isDataLoading, isDataError,pagination, isDataSuccess, dataMessage, getPages, getQuery]);
    useEffect(() => {
      dispatch(unitsByStoreId({"query":getQuery,"page":getPages,"body":{"company_id":company.id}}))
      console.log("asdasd")
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
              Units List 
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
                  {isDataLoading ? 
                    <div className="text-center">
                      <CSpinner size='lg'/>
                    </div>:
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Store</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ip Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
                <CTableBody>
                  {eslList &&
                    eslList.map((data, idx) => (
                    <CTableRow key={idx+1}>
                      <CTableDataCell>{data.id} </CTableDataCell>
                      <CTableDataCell>{data.device_name} </CTableDataCell>
                      <CTableDataCell>{data.client_owner_name} </CTableDataCell>
                      <CTableDataCell>{data.client_store_name} </CTableDataCell>
                      <CTableDataCell>{data.device_size}</CTableDataCell>
                      <CTableDataCell>{data.client_ip_address}</CTableDataCell>
                      <CTableDataCell>{data.client_server_connected ? <CIcon icon={cilCheckCircle} className="text-success" size="md" /> : <CIcon icon={cilXCircle} className="text-danger" size="md" />}</CTableDataCell>
                      <CTableDataCell>
                        <Link
                            to={`/esl/setup/${data.id}`}
                            className="btn btn-outline-info mx-1">
                            Setup
                        </Link>
                        </CTableDataCell>
                    </CTableRow>
                    ))}
                  </CTableBody>
            </CTable>
             } 
            <div>
              <div>Total : {eslList && eslList.length}</div>
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
