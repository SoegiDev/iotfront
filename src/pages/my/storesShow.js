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
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { storesGetRow,storesChange } from '../../features/actions/clientsAction';
import {resetShowApi } from "../../features/showApi";
import {resetPushApi } from "../../features/pushApi";
const FormControl = () => {
  const [showData,setShowData] = useState(null);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const [id, setId] = useState(useParams().id)
  const [company_id, setCompanyId] = useState(useParams().company_id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataShow, isShowLoading,isShowError, isShowSuccess, message: showMessage} = useSelector((state) => state.showApi);
  const { dataPush, isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushApi);
  useEffect(() =>{
    if (showData === null){
    dispatch(storesGetRow({"id":id,"company_id":company_id}))
    }
  },[showData,dispatch]);
  useEffect(() =>{
      if(!isShowLoading){
        console.log("loading "+isShowLoading)
        console.log("error "+isShowError)
        console.log("success "+isShowSuccess)
        console.log("message "+showMessage)
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
    setShowData(prevState => ({ ...prevState, store_name: text }));
    console.log("Set NAME "+text)
  } 
  const setAddress = (text) => {
    setShowData(prevState => ({ ...prevState, store_address: text }));
    console.log("Set ADDRESS"+text)
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
      dispatch(storesChange(postData));
    };
  return (
    <CRow>
      {isShowLoading ?
        <div className="text-center">
          <CSpinner size='lg'/>
        </div>:
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Stores {dataShow && dataShow.store_name}</strong>
          </CCardHeader>
          <CCardBody>
            {dataShow ?
            <CForm onSubmit={pushChange}>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="store_name"
                      label="Name"
                      size="sm"
                      placeholder="Store Name"
                      defaultValue={dataShow.store_name}
                      onChange={(e) => setName(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={8}>
                  <CFormInput
                      type="text"
                      name="store_address"
                      label="address"
                      size="sm"
                      placeholder="Store address"
                      defaultValue={dataShow.store_address}
                      onChange={(e) => setAddress(e.target.value)}
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
                {isPushLoading ? "Loading..." : "Update"}
              </CButton>
            </CForm>
            :<CForm onSubmit={pushChange}></CForm>}
          </CCardBody>
        </CCard>
      </CCol>
      }
    </CRow>
  )
}

export default FormControl
