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

export default function reducer(state = {
  data: [],
  error: null,
  loading: false,
}, action) {
  switch (action.type) {
    case actionTypes.GET_SEARCH_LIST_START: return getSearchListStart(state, action)
    case actionTypes.GET_SEARCH_LIST_FAILED: return getSearchListFailed(state, action)
    case actionTypes.GET_SEARCH_LIST_SUCCESS: return getSearchListSuccess(state, action)
  }
  return state
}