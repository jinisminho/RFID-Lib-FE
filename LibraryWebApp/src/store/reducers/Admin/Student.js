import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false
  })
}
const getStudentSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getStudentFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

const deleteStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    deleteSuccess:false,
  })
}
const deleteStudentSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      deleteSuccess:true
  })
}
const deleteStudentFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const updateStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    updateSuccess:false,
  })
}
const updateStudentSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      updateSuccess:true
  })
}
const updateStudentFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:20,
  })
}

const addStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    addSuccess:false,
  })
}
const addStudentSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      addSuccess:true
  })
}
const addStudentFail = (state, action) =>{
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
    case actionTypes.ADMIN_GET_STUDENT_START: return getStudentStart(state, action)
    case actionTypes.ADMIN_GET_STUDENT_SUCCESS: return getStudentSuccess(state, action)
    case actionTypes.ADMIN_GET_STUDENT_FAILED: return getStudentFail(state, action)

    case actionTypes.ADD_STUDENT_START: return addStudentStart(state, action)
    case actionTypes.ADD_STUDENT_SUCCESS: return addStudentSuccess(state, action)
    case actionTypes.ADD_STUDENT_FAILED: return addStudentFail(state, action)
    
    case actionTypes.CHANGE_STATUS_STUDENT_START: return deleteStudentStart(state, action)
    case actionTypes.CHANGE_STATUS_STUDENT_FAILED: return deleteStudentFail(state, action)
    case actionTypes.CHANGE_STATUS_STUDENT_SUCCESS: return deleteStudentSuccess(state, action)
    
    case actionTypes.UPDATE_STUDENT_START: return updateStudentStart(state, action)
    case actionTypes.UPDATE_STUDENT_FAILED: return updateStudentFail(state, action)
    case actionTypes.UPDATE_STUDENT_SUCCESS: return updateStudentSuccess(state, action)
}
return state
}
 