import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getBookLostStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    data:null,
    bookLost:null
  })
}
const getBookLostSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBookLostFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
  })
}

const getBookLostFineStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    bookLost:null
  })
}
const getBookLostFineSuccess = (state, action) => {
  return updateObject(state, {
    bookLost: action.data,
    error: null,
    loading: false,
  })
}
const getBookLostFineFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}

const cancelConfirm = (state, action) => {
  return updateObject(state, {
    bookLost: null
  })
}
export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  bookLost:null
}, action) {
  switch (action.type) {
    case actionTypes.GET_BOOK_LOST_START: return getBookLostStart(state, action)
    case actionTypes.GET_BOOK_LOST_SUCCESS: return getBookLostSuccess(state, action)
    case actionTypes.GET_BOOK_LOST_FAILED: return getBookLostFail(state, action)

    case actionTypes.GET_BOOK_LOST_FINE_START: return getBookLostFineStart(state, action)
    case actionTypes.GET_BOOK_LOST_FINE_SUCCESS: return getBookLostFineSuccess(state, action)
    case actionTypes.GET_BOOK_LOST_FINE_FAILED: return getBookLostFineFail(state, action)

    case actionTypes.CANCEL_CONFIRM_BOOK_LOST: return cancelConfirm(state, action)
  }
  return state
}
