import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getBookStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}
const getBookSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBookFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,

  })
}

const getLocationStart = (state, action) => {
  return updateObject(state, {
    bookLocation: null,
    error: null,
    loading: true,
  })
}
const getLocationSuccess = (state, action) => {
  return updateObject(state, {
    bookLocation: action.data,
    error: null,
    loading: false,
  })
}
const getLocationFail = (state, action) => {
  return updateObject(state, {
    bookLocation: null,
    error: action.error,
    loading: false,
  })
}

const addBookSearchListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null,
  })
}
const addBookSearchListSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: "Add book to search list successfully"
  })
}
const addBookSearchListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    successMsg: null,
  })
}

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  successMsg: null,
  bookLocation: null,
}, action) {
  switch (action.type) {
    case actionTypes.PATRON_GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.PATRON_GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.PATRON_GET_BOOKS_FAILED: return getBookFail(state, action)

    case actionTypes.PAT_GET_BOOK_LOCATIONS_START: return getLocationStart(state, action)
    case actionTypes.PAT_GET_BOOK_LOCATIONS_FAILED: return getLocationFail(state, action)
    case actionTypes.PAT_GET_BOOK_LOCATIONS_SUCCESS: return getLocationSuccess(state, action)

    case actionTypes.PAT_ADD_BOOK_SEARCH_LIST_START: return addBookSearchListStart(state, action)
    case actionTypes.PAT_ADD_BOOK_SEARCH_LIST_FAILED: return addBookSearchListFail(state, action)
    case actionTypes.PAT_ADD_BOOK_SEARCH_LIST_SUCCESS: return addBookSearchListSuccess(state, action)
  }
  return state
}
