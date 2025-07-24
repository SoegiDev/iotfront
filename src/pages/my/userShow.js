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
import { productGetRow,productsChange } from '../../features/actions/productsAction';
import { unitsByStoreIdSelect } from '../../features/actions/clientsAction';
import {resetDataApi } from "../../features/getApi";
import {resetShowApi } from "../../features/showApi";
import {resetPushApi} from "../../features/pushApi";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData,setShowData] = useState(null);
  const [esl_device, setEslDevice] = useState("");
  const [id, setId] = useState(useParams().id)
  const [esl_send, setesl_send] = useState(false);
  const [item_disc_status, setitem_disc_status] = useState(false);
  const [store_id, setStoreId] = useState(useParams().store_id)
  const [company_id, setCompanyId] = useState(useParams().company_id)
  const [sortList, setSortList] = useState([])
  const { dataShow , isShowLoading, isShowError, isShowSuccess, message: showMessage} = useSelector((state) => state.showApi);
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushApi);
  useEffect(() =>{
    if (showData === null){
      dispatch(productGetRow({"store_id":store_id,"company_id":company_id,"id":id}))
    }
    console.log(showData && showData)
    if(showData && showData.esl_send ){
        setesl_send(showData.esl_send)
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
    dispatch(unitsByStoreIdSelect({"body":{"company_id":company_id,"store_id":store_id}}))
    .then(res => {
      let dataList = res.payload.data
      const items = [...dataList];
      const filteredData = items.filter(items => items.client_owner_id == company_id && items.client_store_id == store_id);
      setSortList(filteredData)
    })
    .catch(err => console.log(err))
    setEslDevice(showData && showData.esl_id)
  },[dataShow, isShowLoading,isShowSuccess, isShowError, showMessage]);
  
  // SET
  const setCategory = (text) => {
    setShowData(prevState => ({ ...prevState, item_category: text }));
    console.log("Set CATEGORY "+text)
  }

  const setName = (text) => {
    setShowData(prevState => ({ ...prevState, item_name: text }));
    console.log("Set Name "+text)
  } 

  const setWeight = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        weight: text
      }}))
    console.log("Set Weight "+text)
  } 
  const setUom = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        uom: text
      }}))
    console.log("Set UOM "+text)
  } 
  const setColor = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        color: text
      }}))
    console.log("Set COLOR "+text)
  } 
  const setHeight = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        height: text
      }}))
    console.log("Set HEIGHT "+text)
  } 
  const setWidth = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        width: text
      }}))
    console.log("Set WIDTH "+text)
  }
  const setDimension = (text) => {
    setShowData(prevState => ({ ...prevState,size: {
        ...prevState.size,
        dimension: text
      }}))
    console.log("Set DIMENSION "+text)
  }
  const setAisle = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
         ...prevState.location,
         aisle: text
       }}))
    console.log("Set AISLE "+text)
  }
  const setLevel = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
        ...prevState.location,
        level: text
      }}))
    console.log("Set LEVEL "+text)
  }
  const setPosition = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
        ...prevState.location,
        position: text
      }}))
    console.log("Set POSITION "+text)
  }
  const setRack = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
        ...prevState.location,
        rack: text
      }}))
    console.log("Set RACK "+text)
  }
  const setSection = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
        ...prevState.location,
        section: text
      }}))
    console.log("Set SECTION "+text)
  } 
  const setZone = (text) => {
    setShowData(prevState => ({ ...prevState,location: {
        ...prevState.location,
        zone: text
      }}))
    console.log("Set ZONE "+text)
  }
  const setPrice = (text) => {
    setShowData(prevState => ({ ...prevState, item_price: text }));
    console.log("Set PRICE "+text)
  }
  const setESL = (text) => {
    setShowData(prevState => ({ ...prevState, esl_id: text }));
    console.log("Set ESL "+text)
    setEslDevice(text)
  }
  const setQris = (text) => {
    setShowData(prevState => ({ ...prevState, item_qris: text }));
    console.log("Set QRis "+text)
  }
  const handleSendESL=(e)=>{
    setShowData(prevState => ({ ...prevState, esl_send: !esl_send }));
    setesl_send(!esl_send)
  }
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
  },[isPushLoading,isPushSuccess]);
  const pushChange = (e) => {
    e.preventDefault();
    let postData = showData && showData
    console.log(postData)
    dispatch(productsChange(postData));
  };
  return (
    <CRow>
      {isShowLoading ? <div className="pt-3 text-center">
                      <CSpinner color="primary" variant="grow" />
                    </div>:
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product ({showData && showData.item_name})</strong>
          </CCardHeader>
          <CCardBody>
            {dataShow ?
            <CForm onSubmit={pushChange} id='esl_show'>
              <CRow>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    name="id"
                    label="SKU"
                    size="sm"
                    placeholder="SKU"
                    defaultValue={dataShow.sku}
                    onChange={(e) => setId(e.target.value)}
                    readOnly
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={6}>
                  <CFormInput
                      type="text"
                      name="item_category"
                      label="Category"
                      size="sm"
                      placeholder="Category"
                      defaultValue={dataShow.item_category}
                      onChange={(e) => setCategory(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={6}>
                  <CFormInput
                      type="text"
                      name="item_name"
                      label="Product Name"
                      size="sm"
                      placeholder="Item Name"
                      defaultValue={dataShow.item_name}
                      onChange={(e) => setName(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <br></br>
              <CCard className="mb-4">
                <CCardHeader className='text-center'>
                  <strong>Size Product</strong>
                </CCardHeader>
                 <CCardBody>
                  <CRow>
                    <CCol xs={2}>
                      <CFormInput
                          type="text"
                          name="Weight"
                          label="Weight"
                          size="sm"
                          placeholder="Weight"
                          maxLength="3"
                          defaultValue={dataShow.size && dataShow.size.weight}
                          onChange={(e) => setWeight(e.target.value)}
                          aria-describedby="exampleFormControlInput1">
                      </CFormInput>
                    </CCol>
                    <CCol xs={2}>
                      <CFormLabel>Uom</CFormLabel>
                      <CFormSelect size="sm" className="mb-3" aria-label="UOM"
                        defaultValue={dataShow.size.uom}
                          onChange={(e) => setUom(e.target.value)}>
                        {dataShow.size.uom?<option value={dataShow.size.uom}>{dataShow.size.uom}</option>: <option value="">Pilih Satuan</option>}
                        <option value="gr">gr</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="ons">ons</option>
                        <option value="kg">kg</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={2}>
                      <CFormLabel>Color</CFormLabel>
                      <CFormSelect size="sm" className="mb-3" aria-label="UOM"
                        defaultValue={dataShow.size.color}
                          onChange={(e) => setColor(e.target.value)}>
                        {dataShow.size.color?<option value={dataShow.size.color}>{dataShow.size.color}</option>: <option value="">Choose</option>}
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Red">Red</option>
                        <option value="Black">Black</option>
                        <option value="Orange">Orange</option> 
                      </CFormSelect>
                    </CCol>
                    <CCol xs={2}>
                      <CFormInput
                          type="text"
                          name="height"
                          label="height"
                          size="sm"
                          placeholder="Height"
                          defaultValue={dataShow.size && dataShow.size.height}
                          onChange={(e) => setHeight(e.target.value)}
                          aria-describedby="exampleFormControlInput1">
                      </CFormInput>
                    </CCol>
                    <CCol xs={2}>
                      <CFormInput
                          type="text"
                          name="width"
                          label="width"
                          size="sm"
                          placeholder="Width"
                          defaultValue={dataShow.size && dataShow.size.width}
                          onChange={(e) => setWidth(e.target.value)}
                          aria-describedby="exampleFormControlInput1">
                      </CFormInput>
                    </CCol>
                    <CCol xs={2}>
                    <CFormInput
                          type="text"
                          name="dimension"
                          label="dimension"
                          size="sm"
                          placeholder="Dimension"
                          defaultValue={dataShow.size && dataShow.size.dimension}
                          onChange={(e) => setDimension(e.target.value)}
                          aria-describedby="exampleFormControlInput1">
                      </CFormInput>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="mb-4">
                <CCardHeader className='text-center'>
                  <strong>Location Product</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                  <CCol xs={2}>
                    <CFormInput
                        type="text"
                        name="aisle"
                        label="Aisle"
                        size="sm"
                        placeholder="Aisle"
                        defaultValue={dataShow.location && dataShow.location.aisle}
                        onChange={(e) => setAisle(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  <CCol xs={2}>
                    <CFormInput
                        type="text"
                        name="level"
                        label="Level"
                        size="sm"
                        placeholder="Level"
                        defaultValue={dataShow.location && dataShow.location.level}
                        onChange={(e) => setLevel(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  <CCol xs={2}>
                      <CFormInput
                        type="text"
                        name="position"
                        label="Position"
                        size="sm"
                        placeholder="Position"
                        defaultValue={dataShow.location && dataShow.location.position}
                        onChange={(e) => setPosition(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  <CCol xs={2}>
                    <CFormInput
                        type="text"
                        name="rack"
                        label="Rack"
                        size="sm"
                        placeholder="Rack"
                        defaultValue={dataShow.location && dataShow.location.rack}
                        onChange={(e) => setRack(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  <CCol xs={2}>
                    <CFormInput
                        type="text"
                        name="section"
                        label="Section"
                        size="sm"
                        placeholder="Section"
                        defaultValue={dataShow.location && dataShow.location.section}
                        onChange={(e) => setSection(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  <CCol xs={2}>
                  <CFormInput
                        type="text"
                        name="zone"
                        label="Zone"
                        size="sm"
                        placeholder="Zone"
                        defaultValue={dataShow.location && dataShow.location.zone}
                        onChange={(e) => setZone(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <br></br>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="item_price"
                      label="Price"
                      size="sm"
                      placeholder="Price"
                      defaultValue={dataShow.item_price}
                      onChange={(e) => setPrice(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                      type="text"
                      name="item_qris"
                      label="Qris Information"
                      size="sm"
                      placeholder="QRIS"
                      defaultValue={dataShow.item_qris}
                      onChange={(e) => setQris(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>ESL Device</CFormLabel>
                  <CFormSelect size="sm" className="mb-3" aria-label="ESL" value={esl_device !==null ? esl_device : ""}
                      onChange={(e) => setESL(e.target.value)}>
                      <option>Select ESL</option>
                      {sortList &&sortList.map((esl, index_esl) => (
                      <option key={index_esl} value={esl.id}>{esl.device_name} ( {esl.device_category} )</option>
                    ))}
                  </CFormSelect>
                </CCol>
                </CRow>
               <br></br>
                <CRow>
                  <CCol xs={4}>
                  {esl_device !== "" ?
                  <CFormSwitch
                      type='checkbox'
                      name="esl_send"
                      defaultChecked={dataShow ===null ? false:dataShow.esl_send?true:false}
                      label="Send To ESL"
                      onChange={handleSendESL}
                      id="esl_send">
                    </CFormSwitch>:
                    <CFormSwitch
                      disabled
                      type='checkbox'
                      name="esl_send"
                      defaultChecked={dataShow ===null ? false:dataShow.esl_send?true:false}
                      label="Send To ESL"
                      onChange={handleSendESL}
                      id="esl_send">
                    </CFormSwitch>}
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
