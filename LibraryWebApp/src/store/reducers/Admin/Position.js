import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getPositionStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false
  })
}
const getPositionSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getPositionFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

const deletePositionStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    deleteSuccess:false,
  })
}
const deletePositionSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      deleteSuccess:true
  })
}
const deletePositionFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updatePositionStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updatePositionSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updatePositionFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addPositionStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addPositionSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      addSuccess:true
  })
}
const addPositionFail = (state, action) =>{
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
    case actionTypes.ADMIN_GET_POSITION_START: return getPositionStart(state, action)
    case actionTypes.ADMIN_GET_POSITION_SUCCESS: return getPositionSuccess(state, action)
    case actionTypes.ADMIN_GET_POSITION_FAILED: return getPositionFail(state, action)

    case actionTypes.ADD_POSITION_START: return addPositionStart(state, action)
    case actionTypes.ADD_POSITION_SUCCESS: return addPositionSuccess(state, action)
    case actionTypes.ADD_POSITION_FAILED: return addPositionFail(state, action)
    
    case actionTypes.DELETE_POSITION_START: return deletePositionStart(state, action)
    case actionTypes.DELETE_POSITION_FAILED: return deletePositionFail(state, action)
    case actionTypes.DELETE_POSITION_SUCCESS: return deletePositionSuccess(state, action)
    
    case actionTypes.UPDATE_POSITION_START: return updatePositionStart(state, action)
    case actionTypes.UPDATE_POSITION_FAILED: return updatePositionFail(state, action)
    case actionTypes.UPDATE_POSITION_SUCCESS: return updatePositionSuccess(state, action)
}
return state
}
 