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
  CTab, CTabContent, CTabList, CTabPanel, CTabs,
  CImage,
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
import { eslShow,eslChange } from '../../features/actions/eslAction';
import {resetShowApi } from "../../features/showSlice";
import {resetPushApi } from "../../features/pushSlice";
import { outletListSearch } from '../../features/actions/outletAction';
const FormControl = () => {
  const profile = useSelector((state) => state.auth.userInfo)
  const [rootCompany,setRootCompany] = useState("")
  const [companyId,setCompanyId] = useState("")
  const [companie, setCompanie] = useState(useParams().company_id)
  const [getPages, setPages] = useState(1)
  const [getQuery, setQuery] = useState("")
  const [storeList,setStoreList] = useState([])
  const [statusSetOutlet, setStatusOutletList] = useState(false);
  const [showData,setShowData] = useState(null);
  const [client_use_setup, setclient_use_setup] = useState(false);
  const [updateContent, setupdateContent] = useState(false);
  const userRole = useSelector((state) => state.auth.userInfo.role)
  const [id, setId] = useState(useParams().id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataShow, isShowLoading,isShowSuccess, isShowError, message: showMessage} = useSelector((state) => state.showSlice);
  const { dataPush, isPushLoading,isPushSuccess, isPushError, message: pushMessage} = useSelector((state) => state.pushSlice);
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  useEffect(() =>{
    if (showData === null){
      dispatch(eslShow({"id":id}))
    }
  },[showData,dispatch]);
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

  useEffect(()=>{
    if (rootCompany === ""){
        dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{}}))
        .then(res => {
          let stor = res.payload.data
          setStoreList(stor)
        })
        .catch(err => console.log(err))
    }else{
       dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
        .then(res => {
          let stor = res.payload.data
          setStoreList(stor)
        })
        .catch(err => console.log(err))
        }    
  },[getQuery,getPages,rootCompany,dispatch])

  useEffect(() =>{
    setclient_use_setup(showData && showData.client_use_setup)
    setupdateContent(showData && showData.updated)
    console.log(showData && showData)
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
            navigate('/device');
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
  const handleUserClientSetup=(e)=>{
    setShowData(prevState => ({ ...prevState, client_use_setup: !client_use_setup }));
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
  const setContentHeader1 = (text) => {
    setShowData(prevState => ({ ...prevState, content_header1: text }));
  }
  const setContentHeader2 = (text) => {
    setShowData(prevState => ({ ...prevState, content_header2: text }));
  }
  const setContentHeaderRight = (text) => {
    setShowData(prevState => ({ ...prevState, content_header_right: text }));
  }
  const setContentFooterCenter = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_center: text }));
  }
  const setContentFooterLeft = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_left: text }));
  }
  const setContentFooterStrike = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_strike: text }));
  }
  const setContentFooterCenterSub = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_center_sub: text }));
  }
  const setContentFooterRightSub = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_right_sub: text }));
  }
  const setContentFooterRight = (text) => {
    setShowData(prevState => ({ ...prevState, content_footer_right: text }));
  }

  const handleUpdateContent=(e)=>{
    setShowData(prevState => ({ ...prevState, updated: !updateContent }));
  }
  const pushChange = (e) => {
      e.preventDefault();
      let postData = showData && showData
      console.log(postData)
      dispatch(eslChange(postData));
    };
  const pushContent = (e) => {
      e.preventDefault();
      let postData = showData && showData
      console.log(postData)
      console.log("push Content")
      dispatch(eslChange(postData));
    };
  const submitStore = (text) => {
    console.log("Submit Store")
    console.log(text)
    console.log(text.company_id)
    dispatch(eslChange({"id":showData.id,"client_owner_id":text.company_id,"client_store_id":text.id}));
  }
  return (
    <CRow>
      {isShowLoading ?
      <div className="text-center">
        <CSpinner size='lg'/>
      </div>:
          <CTabs activeItemKey="setup">
              <CTabList variant="tabs">
                <CTab itemKey="setup">ESL Setup</CTab>
                <CTab itemKey="content">Content</CTab>
                <CTab itemKey="store">Store</CTab>
              </CTabList>
              <CTabContent>
                <CTabPanel className="p-3" itemKey="setup">
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
                                  readOnly
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
                            <CCol xs={4}>
                              <CFormInput
                                  type="text"
                                  name="device_identity"
                                  label="Identity"
                                  size="sm"
                                  placeholder="Identity"
                                  readOnly
                                  defaultValue={dataShow.device_identity}
                                  // readOnly={userRole=="user" ? true : false}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <br></br>
                          <CRow>
                            <CCol xs={4}>
                              <CFormInput
                                  type="text"
                                  name="device_category"
                                  label="Category"
                                  size="sm"
                                  placeholder="Category"
                                  readOnly
                                  defaultValue={dataShow.device_category}
                                  onChange={(e) => setCategory(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={4}>
                              <CFormInput
                                  type="text"
                                  name="client_owner_id"
                                  label="Owner"
                                  size="sm"
                                  placeholder="Owner"
                                  readOnly
                                  defaultValue={dataShow.client_owner_name}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={4}>
                              <CFormInput
                                  type="text"
                                  name="client_store_id"
                                  label="Store"
                                  size="sm"
                                  placeholder="Store"
                                  readOnly
                                  defaultValue={dataShow.client_store_name}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <br></br>
                          <CRow>
                            <CCol xs={4}>
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
                            <CCol xs={4}>
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
                            <CCol xs={4}>
                              <CFormInput
                                  type="text"
                                  name="client_ip_address"
                                  label="Ip Address (DHCP)"
                                  size="sm"
                                  placeholder="Ip Address"
                                  readOnly
                                  defaultValue={dataShow.client_ip_address}
                                  onChange={(e) => setIpAddress(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <br></br>
                          <CRow>
                            <CCol xs={4}>
                              <CFormSwitch 
                                type='checkbox'
                                name="client_use_setup"
                                defaultChecked={dataShow ===null ? false:dataShow.client_use_setup?true:false}
                                label="Use Client Setup"
                                onChange={handleUserClientSetup}
                                id="client_use_setup">
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
                <CTabPanel className="p-3" itemKey="content">
                  <CCol xs={12}>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Content ESL</strong>
                      </CCardHeader>
                      <CCardBody>
                        {dataShow ?
                        <CForm onSubmit={pushContent}>
                          <CRow>
                            <CCol xs={12} className="text-center">
                              <CImage rounded src='http://localhost:8080/static/images/esl_versi1.png'  width={280} height={140} />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs={6}>
                              <CFormInput
                                  type="text"
                                  name="content_header1"
                                  label="Content Header 1 (max: 17 char)"
                                  size="sm"
                                  maxLength={17}
                                  placeholder="Header Name 1"
                                  defaultValue={dataShow.content_header1}
                                  onChange={(e) => setContentHeader1(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={6}>
                             <CFormInput
                                  type="text"
                                  name="content_header2"
                                  label="Content Header 2 (max: 17 char)"
                                  size="sm"
                                  maxLength={17}
                                  placeholder="Header Name 2"
                                  defaultValue={dataShow.content_header2}
                                  onChange={(e) => setContentHeader2(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs={6}>
                              <CFormInput
                                  type="text"
                                  name="content_header_right"
                                  label="SKU Code Label (Max: 13 char"
                                  size="sm"
                                  maxLength={13}
                                  placeholder="SKU Code Label"
                                  defaultValue={dataShow.content_header_right}
                                  onChange={(e) => setContentHeaderRight(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={6}>
                             <CFormInput
                                  type="text"
                                  name="content_footer_center"
                                  label="Price Label (max: 7 char sample:7000000)"
                                  size="sm"
                                  maxLength={7}
                                  placeholder="Price"
                                  defaultValue={dataShow.content_footer_center}
                                  onChange={(e) => setContentFooterCenter(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs={6}>
                              <CFormInput
                                  type="text"
                                  name="content_footer_left"
                                  label="Content Disc (Max: 3)"
                                  size="sm"
                                  maxLength={3}
                                  placeholder="Content Disc"
                                  defaultValue={dataShow.content_footer_left}
                                  onChange={(e) => setContentFooterLeft(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={6}>
                             <CFormInput
                                  type="text"
                                  name="content_footer_strike"
                                  label="Price Strike (max: 7 char sample:8300000)"
                                  size="sm"
                                  maxLength={7}
                                  placeholder="Price Strike"
                                  defaultValue={dataShow.content_footer_strike}
                                  onChange={(e) => setContentFooterStrike(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs={6}>
                              <CFormInput
                                  type="text"
                                  name="content_footer_right"
                                  label="Content Weigth (Uom)"
                                  size="sm"
                                  maxLength={6}
                                  placeholder="Content Weigth"
                                  defaultValue={dataShow.content_footer_right}
                                  onChange={(e) => setContentFooterRight(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                            <CCol xs={6}>
                             <CFormInput
                                  type="text"
                                  name="content_footer_center_sub"
                                  label="Content Expired (Sub Center) (Max : 16 Char)"
                                  size="sm"
                                  maxLength={16}
                                  placeholder="Price Strike"
                                  defaultValue={dataShow.content_footer_center_sub}
                                  onChange={(e) => setContentFooterCenterSub(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol xs={6}>
                              <CFormInput
                                  type="text"
                                  name="content_footer_right_sub"
                                  label="Content Stock Footer (Stock On Hand Max : 11 char)"
                                  size="sm"
                                  maxLength={11}
                                  placeholder="Content Weigth"
                                  defaultValue={dataShow.content_footer_right_sub}
                                  onChange={(e) => setContentFooterRightSub(e.target.value)}
                                  aria-describedby="exampleFormControlInput1">
                              </CFormInput>
                            </CCol>
                          </CRow>
                          <br></br>
                          <CRow>
                            <CCol xs={4}>
                              <CFormSwitch 
                                type='checkbox'
                                name="updated"
                                defaultChecked={dataShow ===null ? false:dataShow.updated?true:false}
                                label="Tes Update Content"
                                onChange={handleUpdateContent}
                                id="updated_id">
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
                        :<CForm onSubmit={pushContent}></CForm>}
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="store">
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
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                              <CTableBody>
                                {storeList  &&
                                  storeList.map((data, idx_item) => (
                                  <CTableRow key={idx_item+1}>
                                    <CTableDataCell>{data.store_name} </CTableDataCell>
                                    <CTableDataCell>{data.store_address} </CTableDataCell>
                                    <CTableDataCell>
                                       <CButton color="primary" disabled={data.id === dataShow.client_store_id ? true:false} onClick={() => submitStore(data)}>
                                          Submit
                                        </CButton>
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
