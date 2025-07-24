import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CPagination,
  CPaginationItem} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { productListSearch } from '../../features/actions/productsAction';
import { cilDevices, cilPencil, cilPlus } from '@coreui/icons';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [productList,setlistProduct] = useState([])
  const [getQuery, setQuery] = useState("")
  const [rootCompany, setRootCompany] = useState("")
  const [companie, setId] = useState(useParams().company_id)
  const [companyId,setCompanyId] = useState("")
  const { data , isDataLoading, isDataError, pagination, isDataSuccess, message: dataMessage} = useSelector((state) => state.getSlice);
  const profile = useSelector((state) => state.auth.userInfo)
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
    
  useEffect(() => {
    if (!isDataLoading){
      setlistProduct(data)
    }
  }, [data, isDataLoading]);
  
  useEffect(() => {
    if (rootCompany === ""){
      dispatch(productListSearch({"query":getQuery,"page":getPages,"body":{}}))
      console.log("Tidak ada company")
    }else{
      dispatch(productListSearch({"query":getQuery,"page":getPages,"body":{"company_id":rootCompany}}))
      console.log("ada company")
    }
  }, [rootCompany,getPages,getQuery,dispatch]);

  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  const addProduct = (queryText) => {
    console.log("Pilih "+queryText)
    navigate("/product/add/"+rootCompany);
  }

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={8}>
                <strong>Product List</strong>
              </CCol>
               { companie !== undefined || companyId !== "" ?
              <CCol xs={4} align="end">
                  <CIcon icon={cilPlus} className="text-success" size="md" /><strong onClick={() => addProduct("Add Product")} style={{ cursor: 'pointer' }}>
                  Add Product</strong>
             </CCol>:""
              }
            </CRow>
          </CCardHeader>
          <CCardBody>
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
             isDataLoading ?
            <div className="text-center">
              <CSpinner size='lg'/>
            </div>:
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sku</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Store</CTableHeaderCell> 
                    <CTableHeaderCell scope="col"><CIcon icon={cilDevices} className="text-success" size="md" /></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  <CTableBody>
                    {productList &&
                      productList.map((data, idx) => (
                      <CTableRow key={idx+1}>
                        <CTableDataCell>{data.sku} </CTableDataCell>
                        <CTableDataCell>{data.item_name} </CTableDataCell>
                        <CTableDataCell>{formatRupiah(data.item_price)} </CTableDataCell>
                        <CTableDataCell>{data.store_name} </CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/product/show/${data.id}/${data.store_id}`}>
                              <CButton color="info" variant="outline" size="sm">
                              <CIcon icon={cilPencil} className="text-success" size="md" />Edit</CButton>
                          </Link>
                          </CTableDataCell>
                      </CTableRow>
                      ))}
                    </CTableBody>
              </CTable>
            }
            <div>
              <div>Total : {productList && productList.length}</div>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Collapses
