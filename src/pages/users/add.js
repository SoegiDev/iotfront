import React ,{ useEffect, useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
  CFormSelect,
  CFormSwitch,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CFormCheck,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from '../../features/actions/userAction';
import { outletListSearch } from '../../features/actions/outletAction';
import {resetShowApi } from "../../features/showSlice";
import {resetPushApi} from "../../features/pushSlice";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempStoreList, setTempStore] = useState({
        storesUser: []
    });
  const [accessLogin, setAccessLogin] = useState(false);
  const [showData,setShowData] = useState({
    "company_id":"",
    "username":"",
    "fullname":"",
    "email":"",
    "password":"",
    "role":"",
    "access_login":false
  });
  const [storeList,setStoreList] = useState([])
  const [getPages, setPages] = useState(1)
  const [getQuery, setQuery] = useState("")
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const profile = useSelector((state) => state.auth.userInfo)
  const [rootCompany,setRootCompany] = useState("")
  const [companyId,setCompanyId] = useState("")
  const [companie, setCompanie] = useState(useParams().company_id)
  const [companieName, setCompanieName] = useState(useParams().company_name)
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

  useEffect(() =>{
    setShowData(prevState => ({ ...prevState, company_id: rootCompany }));
  },[rootCompany]);

  useEffect(() =>{
    console.log(showData && showData)
  },[showData,dispatch]); 

  useEffect(()=>{
    dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
    .then(res => {
      let stor = res.payload.data
      setStoreList(stor)
    })
    .catch(err => console.log(err))    
  },[getQuery,getPages,rootCompany,dispatch])


  useEffect(()=>{
    setShowData(prevState => ({ ...prevState, store: tempStoreList.storesUser }));
  },[tempStoreList])

  // SET
  const BacktoList = (e) => {
    e.preventDefault();
    navigate(-1);
    dispatch(resetPushApi());
    dispatch(resetShowApi());
  };
  useEffect(() =>{
      if(!isPushLoading && isPushSuccess){
          Swal.fire({
          position: "center",
          icon: "success",
          title: pushMessage,
          showConfirmButton: false,
          timer: 1500
          })
          .then(() => {
            navigate(-1);
            dispatch(resetPushApi());
            dispatch(resetShowApi());
          })
      }
      if(!isPushLoading && isPushError){
          Swal.fire({
          position: "center",
          icon: "error",
          title: pushMessage,
          showConfirmButton: false,
          timer: 1500
          })
          .then(() => {
           
          })
      }
  },[isPushLoading,isPushSuccess]);
  const pushChange = (e) => {
    e.preventDefault();
    if(showData.username === ""){
      Swal.fire({
        title: 'Error!',
        text: "Username Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.email === ""){
      Swal.fire({
        title: 'Error!',
        text: "Email Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.password === ""){
      Swal.fire({
        title: 'Error!',
        text: "Password Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.role === ""){
      Swal.fire({
        title: 'Error!',
        text: "Role Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    dispatch(userCreate({'body':showData}));
    
  };
  const setRoleuser = (text) => {
    setShowData(prevState => ({ ...prevState, role: text }));
    console.log("Set Role "+text)
  }

  const setPassword = (text) => {
    setShowData(prevState => ({ ...prevState, password: text }));
    console.log("Set Password "+text)
  }
  const setEmail = (text) => {
    setShowData(prevState => ({ ...prevState, email: text }));
    console.log("Set Email "+text)
  }
  const setUsername = (text) => {
    setShowData(prevState => ({ ...prevState, username: text }));
    console.log("Set Username "+text)
  }
  const setFullname = (text) => {
    setShowData(prevState => ({ ...prevState, fullname: text }));
    console.log("Set Fullname "+text)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const handleSetAccessLogin=(e)=>{
    setShowData(prevState => ({ ...prevState, access_login: !accessLogin }));
    setAccessLogin(!accessLogin)
  }
  const setStoreUser = (e) => {
    const { value, checked } = e.target;
    const { storesUser } = tempStoreList;
    console.log(`${value} is ${checked}`);
    let set = {"company_id":rootCompany,"store_id":value}
    if (checked) {
            setTempStore({
                storesUser: [...storesUser, set]
            });
          }
    else{
      setTempStore({storesUser: storesUser.filter(
        (e) => e.store_id !== value
      )
    });
  }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong> ( {companieName && companieName} )
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={pushChange} id='esl_show'>
              <CRow>
                <CCol sm={6} md={6}>
                  <CFormInput
                    type="text"
                    name="username"
                    label="Username"
                    size="sm"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol sm={6} md={6}>
                  <CFormInput
                    type="text"
                    name="fullname"
                    label="Fullname"
                    size="sm"
                    placeholder="Fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                </CRow>
                <CRow>
                <CCol sm={6} md={6}>
                  <CFormInput
                      type="text"
                      name="email"
                      label="Email"
                      size="sm"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol sm={6} md={6}>
                  <CFormInput
                      type="password"
                      name="password"
                      label="Password"
                      size="sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={4}>
                  <CFormLabel>Role</CFormLabel>
                  <CFormSelect size="sm" className="mb-3" aria-label="Color" onChange={(e) => setRoleuser(e.target.value)}>
                    <option value="">Role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="Staff">Staff</option> 
                  </CFormSelect>
                </CCol>
                </CRow>
                <CRow>
                <CCol xs={4}>
                    <CFormLabel>Access Login</CFormLabel>
                    <CFormSwitch className='text-center'
                      type='checkbox'
                      name="access_login"
                      label=""
                      onChange={handleSetAccessLogin}
                      id="access_login">
                    </CFormSwitch>
                  </CCol>
             
              </CRow>
              <br></br>
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
              storeList === null ?
              <div className="text-center">
                <CSpinner size='lg'/>
              </div>:
                <CTable responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Check</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                    <CTableBody>
                      {storeList  &&
                        storeList.map((data, idx_item) => (
                        <CTableRow key={idx_item+1}>
                          <CTableDataCell>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value={data.id} id={`custom-checkbox-${data.id}`} onChange={(e) => setStoreUser(e)}>
                            </input></div> </CTableDataCell>
                          <CTableDataCell>{data.store_name} </CTableDataCell>
                          <CTableDataCell>{data.store_address} </CTableDataCell>
                          <CTableDataCell>
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
              <br></br>
              <CButton color="secondary" onClick={BacktoList}>
                Cancel
              </CButton>
              <span> </span>
              <CButton 
                type="submit"
                color="primary">
                {isPushLoading ? "Loading..." : "Submit"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
