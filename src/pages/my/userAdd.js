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
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CFormCheck,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from '../../features/actions/userAction';
import { clientsListForUser,storesByCompanyId } from '../../features/actions/clientsAction';
import {resetDataApi } from "../../features/getApi";
import {resetShowApi } from "../../features/showApi";
import {resetPushApi} from "../../features/pushApi";
import { root } from 'postcss';
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempStoreList, setTempStore] = useState({
        storesUser: []
    });
  const [showData,setPostData] = useState({
    "username":"",
    "password":"",
    "email":"",
    "companyList":[],
    "storeList":[],
    "role":""
  });
  const [companyList,setCompanyList] = useState([])
  const [storeList,setStoreList] = useState([])
  const [getPages, setPages] = useState(1)
  const [getQuery, setQuery] = useState("")
  const [rootCompany,setCompany] = useState("")
  const { dataPush , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushApi);
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getApi);
  useEffect(()=>{
    dispatch(clientsListForUser())
      .then(res => {
        let dataList = res.payload.data
        setCompanyList(dataList)
      })
      .catch(err => console.log(err))
  },[dispatch])

  useEffect(()=>{
    if(rootCompany!=""){
      dispatch(storesByCompanyId({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
      .then(res => {
        let stor = res.payload.data
        setStoreList(stor)
      })
      .catch(err => console.log(err))
    }
  },[getQuery,getPages,rootCompany,dispatch])

  useEffect(()=>{
    console.log(showData)
  },[showData])

  useEffect(()=>{
    setPostData(prevState => ({ ...prevState, storeList: tempStoreList.storesUser }));
  },[tempStoreList])


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
    if(showData.username === ""){
      Swal.fire({
        title: 'Error!',
        text: "Username Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.email === ""){
      Swal.fire({
        title: 'Error!',
        text: "Email Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.password === ""){
      Swal.fire({
        title: 'Error!',
        text: "Password Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    if(showData.role === ""){
      Swal.fire({
        title: 'Error!',
        text: "Role Field Empty",
        icon: 'error',
        confirmButtonText: 'OK'
        })
    }
    dispatch(userCreate(showData));
    
  };
  const setRootCompany = (text) => {
    setPostData(prevState => ({ ...prevState, companyList: [text] }));
    console.log("Set COMPANY "+text)
    setCompany(text)
  }
  const setRoleuser = (text) => {
    setPostData(prevState => ({ ...prevState, role: text }));
    console.log("Set Role "+text)
  }

  const setPassword = (text) => {
    setPostData(prevState => ({ ...prevState, password: text }));
    console.log("Set Password "+text)
  }
  const setEmail = (text) => {
    setPostData(prevState => ({ ...prevState, email: text }));
    console.log("Set Email "+text)
  }
  const setUsername = (text) => {
    setPostData(prevState => ({ ...prevState, username: text }));
    console.log("Set Username "+text)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const setStoreUser = (e) => {
    
    const { value, checked } = e.target;
    const { storesUser } = tempStoreList;
    console.log(`${value} is ${checked}`);
    let set = {"company_id":rootCompany,"store_id":value}
    if (checked) {
            setTempStore({
                storesUser: [...storesUser, set]
            });
          }
    else{
      setTempStore({storesUser: storesUser.filter(
        (e) => e.store_id !== value
      )
    });
  }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={pushChange} id='esl_show'>
              <CRow>
                <CCol xs={4}>
                  <CFormInput
                    type="text"
                    name="username"
                    label="Username"
                    size="sm"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={5}>
                  <CFormInput
                      type="text"
                      name="email"
                      label="Email"
                      size="sm"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
                <CCol xs={3}>
                  <CFormInput
                      type="password"
                      name="password"
                      label="Password"
                      size="sm"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="exampleFormControlInput1">
                  </CFormInput>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={6}>
                <CFormLabel>Company list</CFormLabel>
                <CFormSelect size="sm" className="mb-3" aria-label="ESL"
                    onChange={(e) => setRootCompany(e.target.value)}>
                    <option>Select Company</option>
                    {companyList && companyList.map((comp, index_com) => (
                    <option key={index_com} value={comp.id}>{comp.company_name}</option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={3}>
                <CFormLabel>Role</CFormLabel>
                <CFormSelect size="sm" className="mb-3" aria-label="Color" onChange={(e) => setRoleuser(e.target.value)}>
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="Staff">Staff</option> 
                </CFormSelect>
              </CCol>
              </CRow>
              <br></br>
              <CRow>
                  <CCol xs={4}>
                  </CCol>
                  <CCol xs={4}>
                  </CCol>
                  <CCol xs={4} className='align-self-end'>
                    <CFormInput
                        type="text"
                        name="query_search"
                        size="sm"
                        placeholder="Search"
                        onChange={(e) => handleChange(e.target.value)}
                        aria-describedby="exampleFormControlInput1">
                    </CFormInput>
                  </CCol>
                </CRow>
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
                              <input className="form-check-input" type="checkbox" value={data.id} id={`custom-checkbox-${data.id}`} onChange={(e) => setStoreUser(e)}>
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
