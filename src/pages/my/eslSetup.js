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
  CSpinner,
  CFormSwitch,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { eslGetRow,eslChange } from '../../features/actions/eslAction';
import {resetShowApi } from "../../features/showApi";
import {resetPushApi } from "../../features/pushApi";
const FormControl = () => {
  const [showData,setShowData] = useState(null);
  const [item_qris_status, setitem_qris_status] = useState(false);
  const [item_disc_status, setitem_disc_status] = useState(false);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const [id, setId] = useState(useParams().id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataShow, isShowLoading,isShowSuccess, isShowError, message: showMessage} = useSelector((state) => state.showApi);
  const { dataPush, isPushLoading,isPushSuccess, isPushError, message: pushMessage} = useSelector((state) => state.pushApi);
  useEffect(() =>{
    if (showData === null){
      dispatch(eslGetRow({"id":id}))
    }
  },[showData,dispatch]);
  useEffect(() =>{
    if(!isShowLoading){
      console.log("loading "+isShowLoading)
      console.log("error "+isShowError)
      console.log("success "+isShowSuccess)
      console.log("message "+showMessage)
      setShowData(dataShow)
      console.log(showData && showData.id)
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

  useEffect(() =>{
    setitem_qris_status(showData && showData.item_qris_status)
    setitem_disc_status(showData && showData.item_disc_status)
  },[showData]);

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

  const BacktoList = (e) => {
    e.preventDefault();
    navigate(-1);
    dispatch(resetPushApi());
    dispatch(resetShowApi());
  };
  const handleItemDiscStatus=(e)=>{
    setShowData(prevState => ({ ...prevState, item_disc_status: !item_disc_status }));
  }
  
  const handleItemQrisStatus=(e)=>{
    setShowData(prevState => ({ ...prevState, item_qris_status: !item_qris_status }));
  }

  const setName = (text) => {
    setShowData(prevState => ({ ...prevState, device_name: text }));
  }
  const setCategory = (text) => {
    setShowData(prevState => ({ ...prevState, device_category: text }));
  }
  const setWifiSSID = (text) => {
    setShowData(prevState => ({ ...prevState, client_wifi_ssid: text }));
  }
  const setWifiPassword = (text) => {
    setShowData(prevState => ({ ...prevState, client_wifi_password: text }));
  }
  const setIpAddress = (text) => {
    setShowData(prevState => ({ ...prevState, client_ip_address: text }));
  }
  const setEndPoint = (text) => {
    setShowData(prevState => ({ ...prevState, client_endpoint: text }));
  }
  const setServer = (text) => {
    setShowData(prevState => ({ ...prevState, client_server: text }));
  }

  const pushChange = (e) => {
      e.preventDefault();
      let postData = showData && showData
      console.log(postData)
      dispatch(eslChange(postData));
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
            <strong>Setup ESL</strong>
          </CCardHeader>
          <CCardBody>
            {dataShow ?
            <CForm onSubmit={pushChange}>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="devce_name"
                      label="Name"
                      size="sm"
                      placeholder="Device Name"
                      defaultValue={dataShow.device_name}
                      onChange={(e) => setName(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="device_key"
                      label="Key"
                      size="sm"
                      placeholder="Key"
                      readOnly
                      defaultValue={dataShow.device_key}
                      // readOnly={userRole=="user" ? true : false}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <br></br>
              <CRow>
                <CCol xs={8}>
                  <CFormInput
                      type="text"
                      name="device_category"
                      label="Category"
                      size="sm"
                      placeholder="Category"
                      defaultValue={dataShow.device_category}
                      onChange={(e) => setCategory(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <br></br>
              <CRow>
                <CCol xs={6}>
                  <CFormInput
                      type="text"
                      name="client_wifi_ssid"
                      label="Wifi SSID"
                      size="sm"
                      placeholder="Wifi SSID"
                      defaultValue={dataShow.client_wifi_ssid}
                      onChange={(e) => setWifiSSID(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                      type="text"
                      name="client_wifi_password"
                      label="Wifi Password"
                      size="sm"
                      placeholder="Wifi Password"
                      defaultValue={dataShow.client_wifi_password}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <br></br>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="client_ip_address"
                      label="Ip Address"
                      size="sm"
                      placeholder="Ip Address"
                      defaultValue={dataShow.client_ip_address}
                      onChange={(e) => setIpAddress(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="client_server"
                      label="Server"
                      size="sm"
                      placeholder="Server"
                      defaultValue={dataShow.client_server}
                      onChange={(e) => setServer(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="client_endpoint"
                      label="Endpoint"
                      size="sm"
                      placeholder="Endpoint"
                      defaultValue={dataShow.client_endpoint}
                      onChange={(e) => setEndPoint(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <br></br>
              <CRow>
                <CCol xs={4}>
                  <CFormSwitch 
                    type='checkbox'
                    name="item_disc_status"
                    defaultChecked={dataShow ===null ? false:dataShow.item_disc_status?true:false}
                    label="Discount Display"
                    onChange={handleItemDiscStatus}
                    id="itemDiscStatus">
                  </CFormSwitch>
                </CCol>
                <CCol xs={4}>
                  <CFormSwitch 
                    type='checkbox'
                    name="item_qris_status"
                    defaultChecked={dataShow ===null ? false:dataShow.item_qris_status?true:false}
                    label="QRIS Display"
                    onChange={handleItemQrisStatus}
                    id="itemQRISsTATUS">
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
      }
    </CRow>
  )
}
export default FormControl
