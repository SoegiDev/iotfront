import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../features/auths/authAction';
import Swal from 'sweetalert2';
import logo_web from 'src/assets/images/Avistech-logo.png'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { userInfo, isError,isLogin, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if(isLoading){
      Swal.fire({
        title: 'Login Process...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
    }
    if (isError) {
      Swal.close()
      Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'OK'
      })
    }
    if (isLogin) {
      Swal.close();
      navigate("/dashboard");
    }
  }, [userInfo, isLogin, isSuccess, isLoading,dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(userLogin({"username":username,"password":password}));
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
           <div className="text-center">
            <img className="img-fluid" src={logo_web} width="200px" height="32px"  alt="Aviskara Inc" />
          </div>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={Auth}>
                    <div className="text-center">
                      <h1>Login</h1>
                    </div>
                    <p className="text-body-secondary">Sign In to your account</p>
                    {isError && <p className="text-body-secondary small">{message}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" 
                      type="text"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                        type="submit"
                        color="primary" className="px-4 is-success">
                          {isLoading ? "Loading..." : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Login
