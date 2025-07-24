import React ,{ useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
CTab, CTabContent, CTabList, CTabPanel, CTabs
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { userChange } from '../features/actions/userAction';
import {authChange} from '../features/auths/authAction'
import {resetPushApi } from "../features/pushSlice";
const FormControl = () => {
  const [showData,setShowData] = useState(null);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const [accessLogin, setAccessLogin] = useState(false)
  const [activate, setActivate] = useState(false)
  const [role,setRoleUser] = useState(userRole)
  const [newPassword,setNewPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataPush, isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const {wallRole} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.auth.userInfo)
  const [userAccount,setUserAccount] = useState(null)
  
  useEffect(() =>{
    if (showData === null){
       setShowData(profile)
       if (profile.user_account){
        setUserAccount(profile.user_account)
       }
    }
    if(showData && showData.access_login ){
      setAccessLogin(showData.access_login)
    }
    if(showData && showData.activate ){
      setActivate(showData.activate)
    }
    if(showData && showData.role){
      setRoleUser(showData.role)
    }
    console.log(showData)
  },[showData,dispatch]);

  useEffect(() =>{
    console.log(userAccount)
    console.log(wallRole)
  },[userAccount,wallRole,dispatch]);

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
  const setNewAuthPassword = (text) => {
    //setShowData(prevState => ({ ...prevState, employee_email: text }));
    setNewAuthPassword(text)
    console.log("Set New Password "+text)
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
  const BacktoList = (e) => {
    e.preventDefault();
    navigate(-1);
    dispatch(resetPushApi());
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
          })
      }
  },[isPushLoading,isPushSuccess]);
  const pushChange = (e) => {
      e.preventDefault();
      let postData = showData && showData
      console.log(postData)
      if(wallRole.supportTeam.includes(role)){
        dispatch(authChange({"body":postData}));
      }else{
        dispatch(userChange({"body":postData}));
      }
      
    };
  return (
    <CRow>
      {showData === null ?
      <div className="text-center">
        <CSpinner size='lg'/>
      </div>:
      <CTabs activeItemKey={userAccount && userAccount.id ? "user":"auth"}>
        {userAccount && userAccount.id ?
        <CTabList variant="tabs">
          <CTab itemKey="user">User</CTab>
          <CTab itemKey="auth">Auth</CTab>
        </CTabList>:
        <CTabList variant="tabs">
          <CTab itemKey="auth">Auth</CTab>
        </CTabList>
        }
        <CTabContent>
          <CTabPanel className="p-3" itemKey="user">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardBody>
                  {showData ?
                  <CForm onSubmit={pushChange}>
                    <CRow>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="fullname"
                            label="Fullname"
                            size="sm"
                            placeholder="Fullname"
                            defaultValue={userAccount && userAccount.fullname}
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
                            defaultValue={userAccount && userAccount.email}
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
                            defaultValue={userAccount && userAccount.employee_code}
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
                            defaultValue={userAccount && userAccount.employee_email}
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
                  {showData !== null ?
                  <CForm onSubmit={pushChange}>
                    <CRow>
                      <CCol xs={4}>
                        <CFormInput
                            type="text"
                            name="username"
                            label="Username"
                            size="sm"
                            placeholder="Username"
                            defaultValue={showData.username}
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
                            defaultValue={showData.email}
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
                          defaultChecked={showData ===null ? false:showData.activate?true:false}
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
                          defaultChecked={showData ===null ? false:showData && showData.access_login?true:false}
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
        </CTabContent>
      </CTabs>
      }
    </CRow>
  )
}

export default FormControl
