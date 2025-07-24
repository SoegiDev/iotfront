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
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { comCreate } from '../../features/actions/companieAction';
import {resetPushApi} from "../../features/pushSlice";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData,setShowData] = useState(
    {
    "company_name":"",
    "company_address":"",
    "company_email":"",
    "company_sector":"",
    "send_email":false,
    "level":0,
    "backup":false,
    "deep_sleep":false});
  const [sortList, setSortList] = useState([])
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const profile = useSelector((state) => state.auth.userInfo)
  useEffect(() =>{
    console.log(profile)
    },[profile]);
  
  useEffect(() =>{
    console.log(showData && showData)
  },[showData,dispatch]); 

  // SET
  const setCompanyName = (text) => {
    setShowData(prevState => ({ ...prevState, company_name: text }));
    console.log("Set Company Name "+text)
  }

  const setCompanyAddress = (text) => {
    setShowData(prevState => ({ ...prevState, company_address: text }));
    console.log("Set Company Address "+text)
  }

  const setCompanyEmail = (text) => {
    setShowData(prevState => ({ ...prevState, company_email: text }));
    console.log("Set Company Email "+text)
  } 

  // SET
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
      }if(!isPushLoading && isPushError){
          Swal.fire({
          position: "center",
          icon: "error",
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
    dispatch(comCreate({"body":postData}));
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Companie</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={pushChange} id='user_add'>
              <CRow>
                <CCol sm={6} md={4}>
                  <CFormInput
                    type="text"
                    name="company_name"
                    label="Company Name"
                    size="sm"
                    placeholder="Company Name"
                    onChange={(e) => setCompanyName(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                 <CCol sm={6} md={4}>
                  <CFormInput
                      type="text"
                      name="company_email"
                      label="Company Email"
                      size="sm"
                      placeholder="Company Email"
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                      type="text"
                      name="company_address"
                      label="Company Address"
                      size="sm"
                      placeholder="Company Address"
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
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