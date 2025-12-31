import React, { useEffect, useState } from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, 
  CCol, CRow,CSpinner,
  CCardSubtitle,CCardText,CCardLink,
 CBadge,
CPagination, CPaginationItem,CFormInput} from '@coreui/react';
  
import { useDispatch, useSelector } from "react-redux";
import { ESLListSearch } from '../../features/actions/eslAction';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';
const ESLMonitoring = () => {
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
  const colors = [
    { color: 'primary' },
    { color: 'secondary' },
    { color: 'success' },
    { color: 'danger' },
    { color: 'warning' },
    { color: 'info' },
    { color: 'light' },
    { color: 'dark' },
  ]
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>
              ESL Monitoring
              </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={4}>
              </CCol>
              <CCol xs={4}>
              </CCol>
              {/* <CCol xs={4} className='align-self-end'>
                <CFormInput
                    type="text"
                    name="query_search"
                    size="sm"
                    placeholder="Search"
                    onChange={(e) => handleChange(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                </CFormInput>
              </CCol> */}
            </CRow>
              {isDataLoading ? 
                <div className="text-center">
                  <CSpinner size='lg'/>
                </div>:
            <CRow className="g-1">
            {deviceList &&
              deviceList.map((data, idx) => (    
              <CCol md={6} xs={12} lg={4} sm={4} className="px-2" key={idx}>
                <CCard textBgColor="info" style={{ width: '18rem' }}>
                  <CCardBody className="p-0" >
                    <CRow>
                      <CCol xs={8}>
                        <CCardSubtitle className="mb-2 text-body-secondary"style={{marginTop:'5px',marginLeft:'5px',marginRight:'5px'}}>{data.id}</CCardSubtitle>
                      </CCol>
                      <CCol xs={4} className='d-flex justify-content-end'>
                        <CBadge textBgColor="success" >Online</CBadge>
                      </CCol>
                    </CRow>
                    <CCardText className='p-2' style={{color:"white"}}>
                      <h6 xs={4}>Template</h6>
                      <h6 xs={2}> : </h6>
                      <h6 xs={6}>Versi 1</h6>
                    </CCardText>
                    <CCardLink href="#">Card link</CCardLink> 
                    <CCardLink href="#">Another link</CCardLink>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
            </CRow>
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
export default ESLMonitoring