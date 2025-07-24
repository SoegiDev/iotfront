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
    CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { productAdd } from '../../features/actions/productsAction';
import { outletListSearch } from '../../features/actions/outletAction';
import {resetDataApi } from "../../features/getSlice";
import {resetShowApi } from "../../features/showSlice";
import {resetPushApi} from "../../features/pushSlice";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showData,setShowData] = useState({
    "supplier_id":"Supplier ID",
    "supplier_name":"Supplier Name",
    "sku":"",
    "location":{
        "zone":"1",
        "aisle":"",
        "section":"",
        "position":"",
        "level":"",
        "rack":"",
        "color":""},
    "size":{
        "weight":"",
        "height":"",
        "width":"",
        "dimension":"",
        "color":"",
        "uom":""
    },
      "item_name": "",
      "item_desc": "",
      "item_text": "ITEM TEXT",
      "item_category": "",
      "item_price": "0",
      "item_price_disc":"0",
      "item_disc_status": false,
      "item_disc": "0",
      "item_image": "",
      "item_active": false,
      "item_qris": "https://www.google.com",
      "item_qris_status": false
});
  const [tempStoreList, setTempStore] = useState({
        storeProduct: []
    });
  const [storeList,setStoreList] = useState([])
  const [getPages, setPages] = useState(1)
  const [getQuery, setQuery] = useState("")
  const [esl_device, setEslDevice] = useState("");
  const [esl_send, setesl_send] = useState(false);
  const [sortList, setSortList] = useState([])
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const profile = useSelector((state) => state.auth.userInfo)
  const [rootCompany,setRootCompany] = useState("")
  const [companyId,setCompany_Id] = useState("")
  const [companie, setCompanie] = useState(useParams().company_id)
  useEffect(() =>{
      if(profile && profile.user_account){
        if(profile.user_account && profile.user_account.company){
          setCompany_Id(profile.user_account.company.id)
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
    console.log(showData && showData)
  },[showData,dispatch]); 

  useEffect(() =>{
    console.log(showData && showData)
  },[dispatch]); 

  useEffect(()=>{
    dispatch(outletListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
    .then(res => {
      let stor = res.payload.data
      setStoreList(stor)
    })
    .catch(err => console.log(err))    
  },[getQuery,getPages,rootCompany,dispatch])


  // SET

  const setSKU = (text) => {
    setShowData(prevState => ({ ...prevState, sku: text }));
    console.log("Set SKU "+text)
  }

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

  useEffect(()=>{
    setShowData(prevState => ({ ...prevState, store: tempStoreList.storeProduct }));
  },[tempStoreList])

  const setStoreProduct = (e) => {
    const { value, checked } = e.target;
    const { storeProduct } = tempStoreList;
    console.log(`${value} is ${checked}`);
    let set = {"company_id":rootCompany,"store_id":value}
    if (checked) {
            setTempStore({
                storeProduct: [...storeProduct, set]
            });
          }
    else{
        setTempStore({storeProduct: storeProduct.filter(
          (e) => e.store_id !== value
        )
      });
    }
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
    if(showData.sku === ""){
      Swal.fire({
        title: 'Error!',
        text: "Sku Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }if(showData.item_name === ""){
      Swal.fire({
        title: 'Error!',
        text: "Item Name Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }if(showData.item_price === ""){
      Swal.fire({
        title: 'Error!',
        text: "Item Price Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }if(showData.item_category === ""){
      Swal.fire({
        title: 'Error!',
        text: "Sku Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    else{
      dispatch(productAdd({"body":postData}));
    }
    
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Product</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={pushChange} id='esl_show'>
              <CRow>
                <CCol xs={6}>
                  <CFormInput
                    type="text"
                    name="SKU"
                    label="SKU"
                    size="sm"
                    maxLength="13"
                    placeholder="SKU"
                    onChange={(e) => setSKU(e.target.value)}
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
                          onChange={(e) => setWeight(e.target.value)}
                          aria-describedby="exampleFormControlInput1">
                      </CFormInput>
                    </CCol>
                    <CCol xs={2}>
                      <CFormLabel>Uom</CFormLabel>
                      <CFormSelect size="sm" className="mb-3" aria-label="UOM" onChange={(e) => setUom(e.target.value)}>
                        <option value="">uom List</option>
                        <option value="gr">gr</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="ons">ons</option>
                        <option value="kg">kg</option>
                      </CFormSelect>
                    </CCol>
                    <CCol xs={2}>
                      <CFormLabel>Color</CFormLabel>
                      <CFormSelect size="sm" className="mb-3" aria-label="Color" onChange={(e) => setColor(e.target.value)}>
                        <option value="">Color List</option>
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
                      onChange={(e) => setQris(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                {/* <CCol xs={4}>
                  <CFormLabel>ESL Device</CFormLabel>
                  <CFormSelect size="sm" className="mb-3" aria-label="ESL" 
                      onChange={(e) => setESL(e.target.value)}>
                      <option>Select ESL</option>
                      {sortList && sortList.map((esl, index_esl) => (
                      <option key={index_esl} value={esl.id}>{esl.device_name} ( {esl.device_category} )</option>
                    ))}
                  </CFormSelect>
                </CCol> */}
                </CRow>
                <br></br>
                {/* <CRow>
                    <CCol xs={4}>
                    {esl_device === "" ?
                    <CFormSwitch
                        disabled
                        type='checkbox'
                        name="esl_send"
                        label="Send To ESL"
                        onChange={handleSendESL}
                        id="esl_send">
                      </CFormSwitch>:
                      <CFormSwitch
                        type='checkbox'
                        name="esl_send"
                        label="Send To ESL"
                        onChange={handleSendESL}
                        id="esl_send">
                      </CFormSwitch>}
                    </CCol>
                </CRow> */}
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
                                <input className="form-check-input" type="checkbox" value={data.id} id={`custom-checkbox-${data.id}`} onChange={(e) => setStoreProduct(e)}>
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
