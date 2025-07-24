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
import { outletAdd } from '../../features/actions/outletAction';
import {resetPushApi} from "../../features/pushSlice";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData,setShowData] = useState({
    "company_id":"",
    "store_name":"",
    "store_email":"",
    "store_address":""});
  const [sortList, setSortList] = useState([])
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const [companie, setId] = useState(useParams().company_id)
  const [companyId,setCompanyId] = useState("")
  const profile = useSelector((state) => state.auth.userInfo)
  useEffect(() =>{
    console.log(profile)
    if(profile && profile.user_account){
      if(profile.user_account && profile.user_account.company){
        setCompanyId(profile && profile.user_account.company.id)
      }
    }
  },[profile]);
  
  useEffect(() =>{
      if(companie !== undefined)
          setShowData(prevState => ({ ...prevState, company_id: companie }));
      if(companyId !== "")
          setShowData(prevState => ({ ...prevState, company_id: companyId }));
  },[companie,companyId]);
  
  useEffect(() =>{
    console.log(showData && showData)
  },[showData,dispatch]); 

  // SET
  const setStoreName = (text) => {
    setShowData(prevState => ({ ...prevState, store_name: text }));
    console.log("Set STORE Name "+text)
  }

  const setStoreEmail = (text) => {
    setShowData(prevState => ({ ...prevState, store_email: text }));
    console.log("Set Store Email"+text)
  }

  const setStoreAddress = (text) => {
    setShowData(prevState => ({ ...prevState, store_address: text }));
    console.log("Set Store Address "+text)
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
    dispatch(outletAdd({"body":postData}));
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={pushChange} id='user_add'>
              <CRow>
                <CCol sm={6} md={4}>
                  <CFormInput
                    type="text"
                    name="store_name"
                    label="Store name"
                    size="sm"
                    placeholder="Store Name"
                    onChange={(e) => setStoreName(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                 <CCol sm={6} md={4}>
                  <CFormInput
                      type="text"
                      name="store_email"
                      label="Store Email"
                      size="sm"
                      placeholder="Store Email"
                      onChange={(e) => setStoreEmail(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol sm={6} md={4}>
                  <CFormInput
                      type="text"
                      name="store_address"
                      label="Store Address"
                      size="sm"
                      placeholder="Store Address"
                      onChange={(e) => setStoreAddress(e.target.value)}
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
