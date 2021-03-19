import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const getSearchListStart = (state, action) => {
  return updateObject(state, { error: null, loading: true })
}
const getSearchListSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
  })
}
const getSearchListFailed = (state, action) => {
  return updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
  })
}

const finishSearchBookStart = (state, action) => {
  return updateObject(state, { error: null, loading: true,deleteSuccess:false })
}
const finishSearchBookSuccess = (state, action) => {
  return updateObject(state, {
    data: [],
    error: null,
    loading: false,
    deleteSuccess:true
  })
}
const finishSearchBookFailed = (state, action) => {
  return updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    deleteSuccess:false
  })
}
const clearFinish = (state, action) => {
  return updateObject(state, {
    data: [],
  error: null,
  loading: false,
  deleteSuccess:false
  })
}

export default function reducer(state = {
  data: [],
  error: null,
  loading: false,
  deleteSuccess:false
}, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_LIST_START: return getSearchListStart(state, action)
    case actionTypes.GET_SEARCH_LIST_FAILED: return getSearchListFailed(state, action)
    case actionTypes.GET_SEARCH_LIST_SUCCESS: return getSearchListSuccess(state, action)

    case actionTypes.FINISH_SEARCH_BOOK_START: return finishSearchBookStart(state, action)
    case actionTypes.FINISH_SEARCH_BOOK_FAILED: return finishSearchBookFailed(state, action)
    case actionTypes.FINISH_SEARCH_BOOK_SUCCESS: return finishSearchBookSuccess(state, action)

    case actionTypes.CLEAR_FINISH_SEARCH_BOOK: return clearFinish(state, action)
  }
  return state
}