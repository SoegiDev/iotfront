import React ,{ useEffect, useState,useRef } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilLibrary, cilPencil, cilPlus } from '@coreui/icons';
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
  CRow,
   CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CSpinner
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import { useDispatch, useSelector } from "react-redux";
import { importContent,cancelImportStore,saveUpdateContent } from '../../features/actions/importAction';
import {resetPushApi} from "../../features/pushSlice";
const FormControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rootCompany, setRootCompany] = useState("")
  const [companie, setId] = useState(useParams().company_id)
  const [companyId, setCompanyId] = useState("")
  const [fileXls, setFileXls] = useState("")
  const [fileJson, setFileJson] = useState("")
  const [statusUpload, setUpload] = useState("")
  const [dataImport, setDataImport] = useState([])
  const profile = useSelector((state) => state.auth.userInfo)
  const formData = new FormData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteImport, setDeleteImport] = useState(false);
  const [saveImport, setSaveImport] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input
  const { dataPush:retrieveData , isPushLoading, isPushError, isPushSuccess, message: pushMessage} = useSelector((state) => state.pushSlice);
  useEffect(() =>{
    if (profile && profile.user_account.company != null){
        setCompanyId(profile.user_account.company.id)
    }
  },[profile]);
  useEffect(() =>{
    if (companyId !== ""){
      setRootCompany(companyId)
    }if(companie !== undefined){
      setRootCompany(companie)
    }
  },[companie,companyId, dispatch]);
    
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const onFileUpload = () => {
    formData.append("file",selectedFile);
    formData.append("company_id",companyId);
    dispatch(importContent(formData))
  };
  const cancelSave = (e) => {
    e.preventDefault();
    console.log("Cancel Save")
    setDeleteImport(true)
    dispatch(cancelImportStore({"company_id":rootCompany,"file_xls":fileXls,"file_json":fileJson}))
  };

  const SubmitSave = (e) => {
    e.preventDefault();
    console.log("Submit Save")
    setSaveImport(true)
    dispatch(saveUpdateContent({"company_id":rootCompany,"file_xls":fileXls,"file_json":fileJson}));
  };
  
  useEffect(() =>{
    if(isPushLoading){
        Swal.fire({
        title: 'Uploading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      }
    if(!isPushLoading){
      Swal.close();
      }
  },[isPushLoading]);

  useEffect(() =>{
    if(isPushSuccess){
        Swal.fire({
          position: "center",
          icon: "success",
          title: pushMessage,
          showConfirmButton: false,
          timer: 1500
          })
          .then(() => {
            setUpload(false)
            if (deleteImport === true){
                  setDataImport([])
                  setSelectedFile(null)
                  setFileXls("")
                  setFileJson("")
                  setDeleteImport(false)
                  setSaveImport(false)
                  dispatch(resetPushApi());
                  console.log("DELETE FILE");
                  if (fileInputRef.current) {
                      fileInputRef.current.value = ''; // Clear the file input's value
                    }
            }
            if (saveImport === true){
                  console.log("Save berhasil")
                  setDataImport([])
                  setSelectedFile(null)
                  setFileXls("")
                  setFileJson("")
                  setDeleteImport(false)
                  setSaveImport(false)
                   if (fileInputRef.current) {
                      fileInputRef.current.value = ''; // Clear the file input's value
                    }
                  navigate("/device");
                  dispatch(resetPushApi());
            }
          })
      }
    if(isPushError){
        Swal.fire({
          position: "center",
          icon: "error",
          title: pushMessage,
          showConfirmButton: false,
          timer: 1500
          })
          .then(() => {
          })
      }
  },[isPushSuccess,isPushError,deleteImport,saveImport]);
  useEffect(()=>{
  if(retrieveData && dataImport.length === 0)
    setDataImport(retrieveData && retrieveData.data)
    setFileXls(retrieveData && retrieveData.file_xls)
    setFileJson(retrieveData && retrieveData.file_json)
    setUpload(true)
    console.log(retrieveData && retrieveData)
},[retrieveData])
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Content </strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6} md={2}>
                <p>File Name</p>
                <p>File Type</p>
                <p>Last Modified</p>
              </CCol>
               <CCol sm={4} md={10}>
                <p><span>  : {selectedFile !== null && selectedFile.name} </span></p> 
                <p><span>  : {selectedFile !== null && selectedFile.type}</span></p>
                <p><span>  : {selectedFile !== null  && selectedFile.lastModifiedDate.toDateString()}</span></p>
              </CCol>
              <CCol sm={6} md={6}>
                <div className="mb-3">
                    <CFormLabel htmlFor="formFileSm">Import Content (File : .xlsx)</CFormLabel>
                    <CFormInput type="file" size="sm" id="contentUpload" ref={fileInputRef}
                    name="file"
                    // onChange={this.uploadFile} 
                    onChange={onFileChange}/>
                </div>
              </CCol>
              
              <CCol sm={3} md={3}>
                <CFormLabel></CFormLabel>
                <div className="mb-3">
                  {(selectedFile !== null || dataImport.length > 0 ) && statusUpload === true ?
                    <CButton color="info" onClick={onFileUpload}>Upload</CButton>:<CButton color="info" onClick={onFileUpload} disabled>Upload</CButton>
                  }
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={12}>
                {
                  dataImport.length > 0 ?
                <CRow>
                  <CCol xs={6}>
                    <strong>
                    Total Data Import Content ESL: {dataImport.length}
                    </strong>
                  </CCol>
                  <CCol xs={6} align="end">
                    <CButton color="danger" onClick={cancelSave}>
                      Cancel Import 
                    </CButton>
                    <span> </span>
                    <CButton color="info" onClick={SubmitSave}>
                      Submit Data Import 
                    </CButton>
                  </CCol>
                </CRow>:
                ""
              }
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default FormControl
