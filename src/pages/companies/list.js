import React, { useEffect, useState } from 'react';
import { Link,useNavigate,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,CFormInput,
  CPagination,
  CPaginationItem} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { comListSearch } from '../../features/actions/companieAction';
import { cilHouse, cilList, cilPencil,cilPlus } from '@coreui/icons';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [clientList,setListClient] = useState([])
  const [getQuery, setQuery] = useState("")
  const { data, isDataLoading, isDataError, isDataSuccess, pagination, message: dataMessage } = useSelector((state) => state.getSlice);
  const [rootCompany, setRootCompany] = useState("")
  const [companie, setId] = useState(useParams().company_id)
  const [companyId,setCompanyId] = useState("")
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
  },[companie,companyId, dispatch]);

  useEffect(() =>{
    dispatch(comListSearch({"query":getQuery,"page":getPages,"body":{}}))
  },[getQuery,getPages,dispatch]);

  useEffect(() => {
    if (!isDataLoading){
      setListClient(data)
    }
  }, [data, isDataLoading, isDataError,pagination, isDataSuccess, dataMessage, getPages, getQuery]);

  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const addCompanie = (queryText) => {
    console.log(queryText)
    navigate("/companies/add");
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={8}>
              <strong>
                Companie List
              </strong></CCol>
                <CCol xs={4} align="end">
                <CIcon icon={cilPlus} className="text-success" size="md" /><strong onClick={() => addCompanie("Add Companie")} style={{ cursor: 'pointer' }}
                  >Add Companie</strong>
              </CCol>
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
                    <CTableHeaderCell scope="col"><CIcon icon={cilHouse} className="text-success" size="md" /></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  <CTableBody>
                    {clientList &&
                      clientList.map((data, idx) => (
                      <CTableRow key={idx+1}>
                        <CTableDataCell>{data.company_name} </CTableDataCell>
                        <CTableDataCell>{data.company_address} </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/outlet/${data.id}`}>
                                <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilList} className="text-success" size="md" />Stores</CButton>
                          </Link>
                          </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/user/${data.id}/${data.company_name}`}>
                                <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilList} className="text-success" size="md" />Users</CButton>
                          </Link>
                          </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/companies/show/${data.id}`}>
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
              <div>Total Data: {pagination && pagination.total_data}</div>
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
