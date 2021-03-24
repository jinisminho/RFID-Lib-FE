import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false,
    importSuccess:false
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

const getAllPatronTypeStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false,
    patronType:[]
  })
}
const getAllPatronTypeSuccess = (state, action)=>{
  return updateObject(state,{
      patronType: action.data,
      error:null,
      loading:false,
  })
}
const getAllPatronTypeFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
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

const importPatronStart = (state, action) =>{
  return updateObject(state,{
    error:null,
    loading:true,
    importSuccess:false,
  })
}
const importPatronSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      importSuccess:true
  })
}
const importPatronFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
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
    importSuccess:false,
    addSuccess:false,
    patronType:[]
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

    case actionTypes.GET_ALL_PATRON_TYPE_START: return getAllPatronTypeStart(state, action)
    case actionTypes.GET_ALL_PATRON_TYPE_SUCCESS: return getAllPatronTypeSuccess(state, action)
    case actionTypes.GET_ALL_PATRON_TYPE_FAILED: return getAllPatronTypeFail(state, action)

    case actionTypes.IMPORT_PATRON_START: return importPatronStart(state, action)
    case actionTypes.IMPORT_PATRON_SUCCESS: return importPatronSuccess(state, action)
    case actionTypes.IMPORT_PATRON_FAILED: return importPatronFail(state, action)
}
return state
}
 