import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getRentingInfoStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getRentingInfoSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    errOnFetch: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getRentingInfoFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    data: null,
  })
}

const getExtendedHistoryInfoStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}
const getExtendedHistoryInfoSuccess = (state, action) => {
  return updateObject(state, {
    historyData: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page,
    sizePerPage: action.sizePerPage
  })
}
const getExtendedHistoryInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    historyData: null,
  })
}

const extendDueStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const extendDueSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: 'extended'
  })
}

const extendDueFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    successMsg: null
  })
}

const getStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    studentLoading:true
  })
}
const getStudentSuccess = (state, action)=>{
  return updateObject(state,{
      studentData: action.data,
      error:null,
      studentLoading:false,
  })
}
const getStudentFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      studentLoading:false,
  })
}

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  errOnFetch: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  historyData: null,
  successMsg: null,
  studentLoading:false,
  studentData: null,

}, action) {
  switch (action.type) {
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_START: return getRentingInfoStart(state, action)
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_SUCCESS: return getRentingInfoSuccess(state, action)
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_FAILED: return getRentingInfoFail(state, action)

    case actionTypes.LIBRARIAN_GET_DUEHISTORY_START: return getExtendedHistoryInfoStart(state, action)
    case actionTypes.LIBRARIAN_GET_DUEHISTORY_SUCCESS: return getExtendedHistoryInfoSuccess(state, action)
    case actionTypes.LIBRARIAN_GET_DUEHISTORY_FAILED: return getExtendedHistoryInfoFail(state, action)

    case actionTypes.LIBRARIAN_EXTEND_DUE_START: return extendDueStart(state, action)
    case actionTypes.LIBRARIAN_EXTEND_DUE_SUCCESS: return extendDueSuccess(state, action)
    case actionTypes.LIBRARIAN_EXTEND_DUE_FAILED: return extendDueFail(state, action)

    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_START: return getStudentStart(state, action)
    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_SUCCESS: return getStudentSuccess(state, action)
    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_FAILED: return getStudentFail(state, action)

  }
  return state
}
