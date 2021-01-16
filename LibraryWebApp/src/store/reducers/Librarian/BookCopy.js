import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getCopyStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false,
    bookCopyData:null
  })
}
const getCopySuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getCopyFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

const getBookStart = (state, action) =>{
    return updateObject(state,{
      bookError:null, 
      loading:true,
    })
  }
  const getBookSuccess = (state, action)=>{
    return updateObject(state,{
        bookData: action.bookData,
        bookError:null,
        loading:false,
    })
  }
  const getBookFail = (state, action) =>{
    return updateObject(state,{
        bookError:action.error,
        loading:false,
    })
  }

  const getBookStatusStart = (state, action) =>{
    return updateObject(state,{
      error:null, 
      loading:true,
    })
  }
  const getBookStatusSuccess = (state, action)=>{
    return updateObject(state,{
        bookCopyStatus: action.data,
        error:null,
        loading:false,
    })
  }
  const getBookStatusFail = (state, action) =>{
    return updateObject(state,{
        error:action.error,
        loading:false,
    })
  }
const deleteCopyStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    deleteSuccess:false,
  })
}
const deleteCopySuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      deleteSuccess:true
  })
}
const deleteCopyFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updateCopyStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateCopySuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateCopyFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addCopyStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addCopySuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      bookCopyData:action.data
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
export default function reducer(state = {
    data: null,
    total:0,
    error:null,
    bookData:null,
    bookError:null,
    loading:false,
    page:1,
    sizePerPage:10,
    deleteSuccess: false,
    updateSuccess:false,
    addSuccess:false,
    bookCopyData:null,
    bookCopyStatus:null
    
}, action) {
  switch(action.type){
    case actionTypes.GET_COPY_BOOK_START: return getCopyStart(state, action)
    case actionTypes.GET_COPY_BOOK_SUCCESS: return getCopySuccess(state, action)
    case actionTypes.GET_COPY_BOOK_FAILED: return getCopyFail(state, action)

    case actionTypes.GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.GET_BOOKS_FAILED: return getBookFail(state, action)

    case actionTypes.GET_BOOK_COPY_STATUS_START: return getBookStatusStart(state, action)
    case actionTypes.GET_BOOK_COPY_STATUS_SUCCESS: return getBookStatusSuccess(state, action)
    case actionTypes.GET_BOOK_COPY_STATUS_FAILED: return getBookStatusFail(state, action)

    case actionTypes.ADD_COPY_BOOK_START: return addCopyStart(state, action)
    case actionTypes.ADD_COPY_BOOK_SUCCESS: return addCopySuccess(state, action)
    case actionTypes.ADD_COPY_BOOK_FAILED: return addCopyFail(state, action)
    
    case actionTypes.DELETE_COPY_BOOK_START: return deleteCopyStart(state, action)
    case actionTypes.DELETE_COPY_BOOK_FAILED: return deleteCopyFail(state, action)
    case actionTypes.DELETE_COPY_BOOK_SUCCESS: return deleteCopySuccess(state, action)
    
    case actionTypes.UPDATE_COPY_BOOK_START: return updateCopyStart(state, action)
    case actionTypes.UPDATE_COPY_BOOK_FAILED: return updateCopyFail(state, action)
    case actionTypes.UPDATE_COPY_BOOK_SUCCESS: return updateCopySuccess(state, action)
   
}
return state
}
 