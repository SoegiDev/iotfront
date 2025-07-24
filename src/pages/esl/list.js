import React, { useEffect, useState } from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
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
import { ESLListSearch } from '../../features/actions/eslAction';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [deviceList,setlistDevice] = useState([])
  const [getQuery, setQuery] = useState("")
  const [rootCompany, setRootCompany] = useState("")
  const [companie, setId] = useState(useParams().company_id)
  const [companyId,setCompanyId] = useState("")
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const profile = useSelector((state) => state.auth.userInfo)
  useEffect(() =>{
     if(profile && profile.user_account){
       if(profile.user_account && profile.user_account.company){
         setCompanyId(profile.user_account.company.id)
       }
     }
   },[profile]);
  useEffect(() =>{
      if (companyId !== ""){
        setRootCompany(companyId)
      }
      if(companie !== undefined){
        setRootCompany(companie)
      }
      console.log(companie+" "+companyId)
    },[companie,companyId, dispatch]);

   useEffect(() => {
      if (!isDataLoading){
        setlistDevice(data)
      }
    }, [data, isDataLoading]);

  useEffect(() => {
    if (rootCompany === ""){
      dispatch(ESLListSearch({"query":getQuery,"page":getPages,"body":{}}))
      console.log("Tidak ada company")
    }else{
      dispatch(ESLListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
      console.log("ada company")
    }
  }, [rootCompany,getPages,getQuery,dispatch]);

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
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ip Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
                <CTableBody>
                  {deviceList &&
                    deviceList.map((data, idx) => (
                    <CTableRow key={idx+1}>
                      <CTableDataCell>{data.device_name} </CTableDataCell>
                      <CTableDataCell>{data.device_size}</CTableDataCell>
                      <CTableDataCell>{data.client_owner_name} | {data.client_store_name}</CTableDataCell>
                      <CTableDataCell>{data.client_ip_address}</CTableDataCell>
                      <CTableDataCell>{data.client_server_connected ? <CIcon icon={cilCheckCircle} className="text-success" size="md" /> : <CIcon icon={cilXCircle} className="text-danger" size="md" />}</CTableDataCell>
                      <CTableDataCell>
                        <Link
                            to={`/device/show/${data.id}`}
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
              <div>Total : {deviceList && deviceList.length}</div>
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
