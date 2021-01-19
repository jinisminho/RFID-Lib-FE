import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getBookStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false,
    copySuccess:false,
    bookCopyData:null
  })
}
const getBookSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getBookFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

const deleteBookStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    deleteSuccess:false,
  })
}
const deleteBookSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      deleteSuccess:true
  })
}
const deleteBookFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updateBookStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateBookSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateBookFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addBookStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addBookSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      addSuccess:true
  })
}
const addBookFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      page:1,
      sizePerPage:10,
  })
}
const addCopyStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    copySuccess:false,
  })
}
const addCopySuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      copySuccess:true,
      bookCopyData:null
    })
}
const addCopyFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      page:1,
      sizePerPage:10,
  })
}
const generateBarcodeStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const generateBarcodeSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      bookCopyData:action.data
  })
}
const generateBarcodeFailed = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      page:1,
      sizePerPage:10,
  })
}
export default function reducer(state = {
    data: null,
    total:0,
    error:null,
    loading:false,
    page:1,
    sizePerPage:10,
    deleteSuccess: false,
    updateSuccess:false,
    addSuccess:false,
    copySuccess:false,
    bookCopyData:null
}, action) {
  switch(action.type){
    case actionTypes.ADMIN_GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.ADMIN_GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.ADMIN_GET_BOOKS_FAILED: return getBookFail(state, action)

    case actionTypes.ADD_BOOK_START: return addBookStart(state, action)
    case actionTypes.ADD_BOOK_SUCCESS: return addBookSuccess(state, action)
    case actionTypes.ADD_BOOK_FAILED: return addBookFail(state, action)
    
    case actionTypes.DELETE_BOOK_START: return deleteBookStart(state, action)
    case actionTypes.DELETE_BOOK_FAILED: return deleteBookFail(state, action)
    case actionTypes.DELETE_BOOK_SUCCESS: return deleteBookSuccess(state, action)
    
    case actionTypes.UPDATE_BOOK_START: return updateBookStart(state, action)
    case actionTypes.UPDATE_BOOK_FAILED: return updateBookFail(state, action)
    case actionTypes.UPDATE_BOOK_SUCCESS: return updateBookSuccess(state, action)

    case actionTypes.ADD_COPY_BOOK_START: return addCopyStart(state, action)
    case actionTypes.ADD_COPY_BOOK_FAILED: return addCopyFail(state, action)
    case actionTypes.ADD_COPY_BOOK_SUCCESS: return addCopySuccess(state, action)

    case actionTypes.GENERATE_COPY_BARCODE_START: return generateBarcodeStart(state, action)
    case actionTypes.GENERATE_COPY_BARCODE_FAILED: return generateBarcodeFailed(state, action)
    case actionTypes.GENERATE_COPY_BARCODE_SUCCESS: return generateBarcodeSuccess(state, action)
   
}
return state
}
 