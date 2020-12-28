import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'

const getBooksStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}
const getBooksSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
    total:action.total,
    page:action.page+1,
    sizePerPage: action.sizePerPage
  })
}
const getBooksFailed = (state, action) => {
  return updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    total:0,
    page:1,
    sizePerPage:10,
  })
}

export default function reducer(state = {
  data: [],
  error: null,
  loading: false,
  total: 0,
  page: 1,
  sizePerPage: 10,
}, action) {
  switch (action.type) {
    case actionTypes.GET_BOOKS_START: return getBooksStart(state, action)
    case actionTypes.GET_BOOKS_FAILED: return getBooksFailed(state, action)
    case actionTypes.GET_BOOKS_SUCCESS: return getBooksSuccess(state, action)
  }
  return state
}