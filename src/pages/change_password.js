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
import { authChangePassword } from '../features/auths/authAction';
import {resetPushApi } from "../features/pushSlice";
const FormControl = () => {
  const [showData,setShowData] = useState(null);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const [accessLogin, setAccessLogin] = useState(false)
  const [activate, setActivate] = useState(false)
  const [confirmPassword, setConfirm] = useState(false)
  const [role,setRoleUser] = useState(userRole)
  const [newPassword,setNewPassword] = useState("")
  const [messageChange,setMessage] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataPush, isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const profile = useSelector((state) => state.auth.userInfo)
  useEffect(() =>{
    if (showData === null){
       setShowData(profile)
    }
    console.log(showData)
  },[showData,dispatch]);

  useEffect(() =>{
    console.log(showData)
  },[newPassword,dispatch]);
  const setConfirmPassword = (text) => {
    if (text === newPassword){
      setConfirm(true)
      setMessage("Password Correct")
      console.log("Set New Password "+text+" "+newPassword)
    }else{
      setConfirm(false)
      setMessage("Password Not Correct")
    }
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
    let dataPost = {"id":postData.id,"password":newPassword}
    console.log(dataPost)
    
    dispatch(authChangePassword({"body":{"id":postData.id,"password":newPassword}}));
    
  };
  return (
    <CRow>
      {showData === null ?
        <div className="text-center">
          <CSpinner size='lg'/>
        </div>:
        <CCol sm={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Change Password</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={pushChange} id='change_password_user'>
                <CRow>
                  <CCol xs={12}>
                    <CFormInput
                        type="text"
                        name="new_password"
                        label="New Password"
                        size="sm"
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12}>
                    <CFormInput
                        type="text"
                        name="new_password"
                        label="Confirm New Password"
                        size="sm"
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                   {messageChange && <p className="text-body-secondary small">{messageChange}</p>}
                </CRow>
                <br></br>
                <CButton color="secondary" onClick={BacktoList}>
                  Cancel
                </CButton>
                <span> </span>
                {
                  confirmPassword ? 
                <CButton 
                  type="submit"
                  color="primary">
                  {isPushLoading ? "Loading..." : "Update Password"}
                </CButton>:<CButton 
                  type="submit"
                  color="primary" disabled>
                  {isPushLoading ? "Loading..." : "Update Password"}
                </CButton>
                }
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      }
    </CRow>
  )
}

export default FormControl
