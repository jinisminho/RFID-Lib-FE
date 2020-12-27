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
    loading: true
  })
}
const extendDueSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  })
}
const extendDueFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  historyData: null

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

  }
  return state
}
