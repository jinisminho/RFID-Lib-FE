import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getBookLostStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    data:null
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

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
}, action) {
  switch (action.type) {
    case actionTypes.GET_BOOK_LOST_START: return getBookLostStart(state, action)
    case actionTypes.GET_BOOK_LOST_SUCCESS: return getBookLostSuccess(state, action)
    case actionTypes.GET_BOOK_LOST_FAILED: return getBookLostFail(state, action)
  }
  return state
}
