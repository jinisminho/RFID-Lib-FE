import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../ultility'


const getRentingInfoStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}
const getRentingInfoSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getRentingInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
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

const addReminderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const addReminderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: action.msg
  })
}
const addReminderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    successMsg: null
  })
}

const getStudentProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}
const getStudentProfileSuccess = (state, action) => {
  return updateObject(state, {
    usrName: action.data["username"],
    email: action.data["email"],
    fstName: action.data["fstName"],
    lstName: action.data["lstName"],
    profile: action.data,
    error: null,
    loading: false,
  })
}
const getStudentProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    data: null,
  })
}

const updateStudentProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const updateStudentProfileSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: 'update profile success'
  })
}
const updateStudentProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    data: null,
  })
}

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  historyData: null,
  successMsg: null,
  usrName: '',
  email: '',
  fstName: '',
  lstName: '',
  profile: null
}, action) {
  switch (action.type) {
    case actionTypes.STUDENT_GET_RENTINGINFO_START: return getRentingInfoStart(state, action)
    case actionTypes.STUDENT_GET_RENTINGINFO_SUCCESS: return getRentingInfoSuccess(state, action)
    case actionTypes.STUDENT_GET_RENTINGINFO_FAILED: return getRentingInfoFail(state, action)
    case actionTypes.STUDENT_GET_DUEHISTORY_START: return getExtendedHistoryInfoStart(state, action)
    case actionTypes.STUDENT_GET_DUEHISTORY_SUCCESS: return getExtendedHistoryInfoSuccess(state, action)
    case actionTypes.STUDENT_GET_DUEHISTORY_FAILED: return getExtendedHistoryInfoFail(state, action)
    case actionTypes.STUDENT_EXTEND_DUE_START: return extendDueStart(state, action)
    case actionTypes.STUDENT_EXTEND_DUE_SUCCESS: return extendDueSuccess(state, action)
    case actionTypes.STUDENT_EXTEND_DUE_FAILED: return extendDueFail(state, action)
    case actionTypes.STUDENT_ADD_REMINDER_START: return addReminderStart(state, action)
    case actionTypes.STUDENT_ADD_REMINDER_SUCCESS: return addReminderSuccess(state, action)
    case actionTypes.STUDENT_ADD_REMINDER_FAILED: return addReminderFail(state, action)
    case actionTypes.STUDENT_GET_PROFILE_START: return getStudentProfileStart(state, action)
    case actionTypes.STUDENT_GET_PROFILE_SUCCESS: return getStudentProfileSuccess(state, action)
    case actionTypes.STUDENT_GET_PROFILE_FAILED: return getStudentProfileFail(state, action)
    case actionTypes.STUDENT_UPDATE_PROFILE_START: return updateStudentProfileStart(state, action)
    case actionTypes.STUDENT_UPDATE_PROFILE_SUCCESS: return updateStudentProfileSuccess(state, action)
    case actionTypes.STUDENT_UPDATE_PROFILE_FAILED: return updateStudentProfileFail(state, action)

  }
  return state
}
