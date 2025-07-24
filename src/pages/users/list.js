import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilLibrary, cilPencil, cilPlus } from '@coreui/icons';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CPagination,
  CButton,
  CPaginationItem} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { userListSearch } from '../../features/actions/userAction';
import { resetDataApi } from '../../features/getSlice';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [userList,setListUser] = useState([])
  const [companie, setId] = useState(useParams().company_id)
  const [getQuery, setQuery] = useState("")
  const [companyId,setCompanyId] = useState("")
  const [rootCompany,setRootCompany] = useState("")
  const { data, isDataLoading, pagination, isDataError,isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
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
      setListUser(data)
    }
  }, [data, isDataLoading]);

  useEffect(() => {
      if (rootCompany === ""){
        dispatch(userListSearch({"query":getQuery,"page":getPages,"body":{}}))
        console.log("Tidak ada company")
      }else{
        dispatch(userListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
        console.log("ada company")
      }
    }, [rootCompany,getPages,getQuery,dispatch]);

  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const addUser = (queryText) => {
    console.log("Pilih "+queryText)
    navigate("/user/add/"+rootCompany);
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
             <CCol xs={8}>
              <strong>
                User List (Only Admin Team)
              </strong></CCol>
               <CCol xs={4} align="end">
                <CIcon icon={cilPlus} className="text-success" size="md" /><strong onClick={() => addUser("Add User")} style={{ cursor: 'pointer' }}
                  >Add User</strong>
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
                    <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell> 
                    <CTableHeaderCell scope="col">Company</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  <CTableBody>
                    {userList && isDataSuccess &&
                      userList.map((data, idx_item) => (
                      <CTableRow key={idx_item+1}>
                        <CTableDataCell>{data && data.username} </CTableDataCell>
                        <CTableDataCell>{data && data.email} </CTableDataCell>
                        <CTableDataCell>{data && data.role} </CTableDataCell>
                        <CTableDataCell>{data && data.company && data.company.company_name} </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/user/show/${data.id}`}
                              className="btn btn-outline-info mx-1">
                               <CIcon icon={cilPencil} className="text-success" size="md" /> Edit
                          </Link>
                        </CTableDataCell>
                      </CTableRow>
                      ))}
                    </CTableBody>
              </CTable>
            }
            <div>
              <div>Total : {userList && userList.length}</div>
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
