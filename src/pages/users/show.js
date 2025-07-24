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
  CFormSelect,
  CSpinner,
  CFormSwitch,
  CRow,
CTab, CTabContent, CTabList, CTabPanel, CTabs,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { userShow,userChange } from '../../features/actions/userAction';
import { outletListSearch } from '../../features/actions/outletAction';
import {resetShowApi } from "../../features/showSlice";
import {resetPushApi } from "../../features/pushSlice";
const FormControl = () => {
  const [storeList,setStoreList] = useState([])
  const [statusSetOutlet, setStatusOutletList] = useState(false);
  const [tempStoreList, setTempStore] = useState({
          storesUser: []
      });
  const [getPages, setPages] = useState(1)
  const [getQuery, setQuery] = useState("")
  const [showData,setShowData] = useState(null);
  const [id, setId] = useState(useParams().id)
  const [accessLogin, setAccessLogin] = useState(false)
  const [activate, setActivate] = useState(false)
  const [role,setRoleUser] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataShow, isShowLoading,isShowError, isShowSuccess, message: showMessage} = useSelector((state) => state.showSlice);
  const { dataPush, isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const profile = useSelector((state) => state.auth.userInfo)
  const [rootCompany,setRootCompany] = useState("")
  const [companyId,setCompanyId] = useState("")
  const [companie, setCompanie] = useState(useParams().company_id)
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
    if (showData === null){
      dispatch(userShow({"body":{"id":id}}))
    }else{
      if(statusSetOutlet === false ){
        if (showData && showData.store){
            let storeList = showData && showData.store
            setTempStore({storesUser:storeList})
            setStatusOutletList(true)
        }
        
      }
      if(showData && showData.access_login ){
        setAccessLogin(showData.access_login)
        setActivate(showData.activate)
      }
      if(showData && showData.activate ){
        setActivate(showData.activate)
      }
      if(showData && showData.role){
        setRoleUser(showData.role)
      }
    }
  },[showData,statusSetOutlet,dispatch]);

  useEffect(()=>{
    setShowData(prevState => ({ ...prevState, store: tempStoreList.storesUser }));
    let lengthStore = tempStoreList.storesUser
    console.log(lengthStore)
  },[tempStoreList]) 

  useEffect(()=>{
    console.log(showData && showData)
  },[showData]) 

  useEffect(()=>{
    dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
    .then(res => {
      let stor = res.payload.data
      setStoreList(stor)
    })
    .catch(err => console.log(err))    
  },[getQuery,getPages,rootCompany,dispatch])

  

  useEffect(() =>{
    if(!isShowLoading){
      setShowData(dataShow)
    }
    if(isShowError){
      if(isShowError){
        Swal.fire({
          title: 'Error!',
          text: showMessage,
          icon: 'error',
          confirmButtonText: 'OK'
          })
      }
    }
  },[dataShow, isShowLoading,isShowSuccess, isShowError, showMessage]);
  
  const setName = (text) => {
    setShowData(prevState => ({ ...prevState, fullname: text }));
    console.log("Set NAME "+text)
  } 
  const setEmail = (text) => {
    setShowData(prevState => ({ ...prevState, email: text }));
    console.log("Set ADDRESS"+text)
  }
  const setRole = (text) => {
    setShowData(prevState => ({ ...prevState, role: text }));
    console.log("Set Role "+text)
  }
  const setEmployeeCode = (text) => {
    setShowData(prevState => ({ ...prevState, employee_code: text }));
    console.log("Set EMployee Code"+text)
  }
  const setEmployeeEmail = (text) => {
    setShowData(prevState => ({ ...prevState, employee_email: text }));
    console.log("Set EMployee Email"+text)
  }
  const setAuth_username = (text) => {
      setShowData(prevState => ({ ...prevState,auth_account: {
        ...prevState.auth_account,
        username: text
      }}))
      setShowData(prevState => ({ ...prevState, username: text }));
    console.log("Set Username Auth"+text)
  }
  const setAuth_email = (text) => {
      setShowData(prevState => ({ ...prevState,auth_account: {
        ...prevState.auth_account,
        email: text
      }}))
      setShowData(prevState => ({ ...prevState, email: text }));
    console.log("Set Username Auth"+text)
  }
  const handleSetAccessLogin=(e)=>{
    setShowData(prevState => ({ ...prevState, access_login: !accessLogin }));
    setAccessLogin(!accessLogin)
  }
  const handleSetActivate=(e)=>{
    setShowData(prevState => ({ ...prevState,auth_account: {
        ...prevState.auth_account,
        activate: !activate
      }}))
    setShowData(prevState => ({ ...prevState, activate: !activate }));
    setActivate(!activate)
  }

  const setStoreUser = (e) => {
    const { value, checked } = e.target;
    const { storesUser } = tempStoreList;
    console.log(tempStoreList)
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
  },[isPushLoading,isPushSuccess]);
  const pushChange = (e) => {
      e.preventDefault();
      let postData = showData && showData
      console.log(postData)
      dispatch(userChange({"body":postData}));
    };
  return (
    <CRow>
      {isShowLoading ?
      <div className="text-center">
        <CSpinner size='lg'/>
      </div>:
      <CTabs activeItemKey="user">
        <CTabList variant="tabs">
          <CTab itemKey="user">User</CTab>
          <CTab itemKey="auth">Auth</CTab>
          <CTab itemKey="stores">Store</CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="p-3" itemKey="user">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  {dataShow ?
                  <CForm onSubmit={pushChange}>
                    <CRow>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="fullname"
                            label="Fullname"
                            size="sm"
                            placeholder="Fullname"
                            defaultValue={dataShow.fullname}
                            onChange={(e) => setName(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="email"
                            label="Email"
                            size="sm"
                            placeholder="Email"
                            defaultValue={dataShow.email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="employee_code"
                            label="Employee Code"
                            size="sm"
                            placeholder="Employee Code"
                            defaultValue={dataShow.employee_code}
                            onChange={(e) => setEmployeeCode(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="employee_email"
                            label="Employee Email"
                            size="sm"
                            placeholder="Employee Email"
                            defaultValue={dataShow.employee_email}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={4}>
                        <CFormLabel>Role</CFormLabel>
                        <CFormSelect size="sm" className="mb-3" aria-label="Color" onChange={(e) => setRole(e.target.value)}
                          value={role !=="" ? role : ""}>
                          <option value="">Role</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="supervisor">Supervisor</option>
                          <option value="Staff">Staff</option> 
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <br></br>
                    <CButton color="secondary" onClick={BacktoList}>
                      Cancel
                    </CButton>
                    <span> </span>
                    <CButton 
                      type="submit"
                      color="primary">
                      {isPushLoading ? "Loading..." : "Update"}
                    </CButton>
                  </CForm>
                  :<CForm onSubmit={pushChange}></CForm>}
                </CCardBody>
              </CCard>
            </CCol>
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="auth">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  {dataShow && dataShow.auth_account ?
                  <CForm onSubmit={pushChange}>
                    <CRow>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="username"
                            label="Username"
                            size="sm"
                            placeholder="Username"
                            defaultValue={dataShow.auth_account.username}
                            onChange={(e) => setAuth_username(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="email"
                            label="Email"
                            size="sm"
                            placeholder="Email"
                            defaultValue={dataShow.auth_account.email}
                            onChange={(e) => setAuth_email(e.target.value)}
                            aria-describedby="exampleFormControlInput1">
                        </CFormInput>
                      </CCol>
                    </CRow>
                    <CRow>
                     <CCol xs={4}>
                        <CFormLabel>Activate</CFormLabel>
                        <CFormSwitch className='text-center'
                          type='checkbox'
                          name="activate"
                          defaultChecked={dataShow ===null ? false:dataShow.auth_account.activate?true:false}
                          label=""
                          onChange={handleSetActivate}
                          id="access_login">
                        </CFormSwitch>
                      </CCol>
                     
                      <CCol xs={4}>
                        <CFormLabel>Access Login</CFormLabel>
                        <CFormSwitch className='text-center'
                          type='checkbox'
                          name="access_login"
                          defaultChecked={dataShow ===null ? false:dataShow.access_login?true:false}
                          label=""
                          onChange={handleSetAccessLogin}
                          id="access_login">
                        </CFormSwitch>
                      </CCol>
                    </CRow>
                    <br></br>
                    <CButton color="secondary" onClick={BacktoList}>
                      Cancel
                    </CButton>
                    <span> </span>
                    <CButton 
                      type="submit"
                      color="primary">
                      {isPushLoading ? "Loading..." : "Update"}
                    </CButton>
                  </CForm>
                  :<CForm onSubmit={pushChange}></CForm>}
                </CCardBody>
              </CCard>
            </CCol>
          </CTabPanel>
          <CTabPanel className="p-3" itemKey="stores">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
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
                                  <input className="form-check-input" type="checkbox" 
                                  value={data.id} id={`custom-checkbox-${data.id}`} onChange={(e) => setStoreUser(e)}
                                  checked={tempStoreList.storesUser.find(e => e.store_id === data.id) ? true:false}
                                  >
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
                </CCardBody>
              </CCard>
            </CCol>
          </CTabPanel>
        </CTabContent>
      </CTabs>
      }
    </CRow>
  )
}

export default FormControl
