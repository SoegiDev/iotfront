import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
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
import { outletListSearch } from '../../features/actions/outletAction';
import { cilDevices, cilLibrary, cilListNumbered, cilPencil, cilPlus } from '@coreui/icons';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [storeList,setlistStore] = useState([])
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
      setlistStore(data)
    }
  }, [data, isDataLoading]);
  
  useEffect(() => {
    if (rootCompany === ""){
      dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{}}))
      console.log("Tidak ada company")
    }else{
      dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
      console.log("ada company")
    }
  }, [rootCompany,getPages,getQuery,dispatch]);

  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const addOutlet = (queryText) => {
    console.log("Pilih "+queryText)
    navigate("/outlet/add/"+rootCompany);
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={8}>
                <strong>Store List</strong>
              </CCol>
               { companie !== undefined || companyId !== "" ?
              <CCol xs={4} align="end">
                  <CIcon icon={cilPlus} className="text-success" size="md" /><strong onClick={() => addOutlet("Add Outlet")} style={{ cursor: 'pointer' }}>
                  Add Outlet</strong>
             </CCol>:""
              }
            </CRow>
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
                              to={`/outlet/show/${data.id}/${data.company_id}`}>
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
