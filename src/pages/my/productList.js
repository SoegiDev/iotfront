import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import { cilLibrary, cilPlus } from '@coreui/icons';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CPagination,
  CButton,
  CPaginationItem} from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { productGetListOwn } from '../../features/actions/productsAction';
import { resetDataApi } from '../../features/getApi';
const Collapses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPages, setPages] = useState(1)
  const [productList,setListProduct] = useState([])
  const [getQuery, setQuery] = useState("")
  const { data, isDataLoading, pagination, isDataError,isDataSuccess, message: dataMessage} = useSelector((state) => state.getApi);
  useEffect(() =>{
    dispatch(productGetListOwn({"query":getQuery,"page":getPages}))
  },[getQuery,getPages,dispatch]);
  useEffect(() => {
    if (!isDataLoading){
      console.log("loading "+isDataLoading)
      console.log("error "+isDataError)
      console.log("pagination "+pagination)
      console.log("success "+isDataSuccess)
      console.log("message "+dataMessage)
      console.log("query "+getQuery)
      console.log("Pages "+getPages)
      setListProduct(data)
    }
  }, [data, isDataLoading, isDataError,pagination, isDataSuccess, dataMessage, getPages, getQuery]);
  useEffect(() => {
      dispatch(productGetListOwn({"query":getQuery,"page":getPages}))
  }, [getPages,getQuery,dispatch]);
  const clickMe = (parameter) => (event) => {
      setPages(parameter)
  }
  const handleChange = (queryText) => {
    setQuery(queryText)
  }
  function formatRupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(number);
    }
  const addProduct = (queryText) => {
    console.log("Pilih "+queryText)
    //navigate("/client/stores/product/add/"+store_id+"/"+store_name+"/"+company_id);
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
             <CCol xs={8}><strong>
              Product List 
              </strong></CCol>
               <CCol xs={4} align="end">
                <CIcon icon={cilPlus} className="text-success" size="md" /><strong onClick={() => addProduct("Add Product")} style={{ cursor: 'pointer' }}
                  >Add Product</strong>
          </CCol>
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
                    <CTableHeaderCell scope="col">SKU</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ESL</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                  <CTableBody>
                    {productList && isDataSuccess &&
                      productList.map((data, idx_item) => (
                      <CTableRow key={idx_item+1}>
                        <CTableDataCell>{data.sku} </CTableDataCell>
                        <CTableDataCell>{data.item_name} </CTableDataCell>
                        <CTableDataCell>{data.item_category}</CTableDataCell>
                        <CTableDataCell>{formatRupiah(data.item_price)}</CTableDataCell>
                        <CTableDataCell>{data.esl_name && data.esl_name }</CTableDataCell>
                        <CTableDataCell>
                          <Link
                              to={`/client/stores/product/show/${data.id}/${data.store_id}/${data.company_id}/${data.store_name}`}
                              className="btn btn-outline-info mx-1">
                              Update Data
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
