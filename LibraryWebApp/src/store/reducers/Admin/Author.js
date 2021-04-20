import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getAuthorStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false
  })
}
const getAuthorSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getAuthorFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

const deleteAuthorStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    deleteSuccess:false,
  })
}
const deleteAuthorSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      deleteSuccess:true
  })
}
const deleteAuthorFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updateAuthorStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateAuthorSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateAuthorFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addAuthorStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addAuthorSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      addSuccess:true
  })
}
const addAuthorFail = (state, action) =>{
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
    addSuccess:false
}, action) {
  switch(action.type){
    case actionTypes.ADMIN_GET_AUTHOR_START: return getAuthorStart(state, action)
    case actionTypes.ADMIN_GET_AUTHOR_SUCCESS: return getAuthorSuccess(state, action)
    case actionTypes.ADMIN_GET_AUTHOR_FAILED: return getAuthorFail(state, action)

    case actionTypes.ADD_AUTHOR_START: return addAuthorStart(state, action)
    case actionTypes.ADD_AUTHOR_SUCCESS: return addAuthorSuccess(state, action)
    case actionTypes.ADD_AUTHOR_FAILED: return addAuthorFail(state, action)
    
    case actionTypes.DELETE_AUTHOR_START: return deleteAuthorStart(state, action)
    case actionTypes.DELETE_AUTHOR_FAILED: return deleteAuthorFail(state, action)
    case actionTypes.DELETE_AUTHOR_SUCCESS: return deleteAuthorSuccess(state, action)
    
    case actionTypes.UPDATE_AUTHOR_START: return updateAuthorStart(state, action)
    case actionTypes.UPDATE_AUTHOR_FAILED: return updateAuthorFail(state, action)
    case actionTypes.UPDATE_AUTHOR_SUCCESS: return updateAuthorSuccess(state, action)
}
return state
}
 