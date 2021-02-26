import { getCopyType } from 'store/actions'
import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getCopyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    deleteSuccess: false,
    updateSuccess: false,
    addSuccess: false,
    bookCopyData: null
  })
}
const getCopySuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getCopyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,

  })
}

const getBookStart = (state, action) => {
  return updateObject(state, {
    bookError: null,
    loading: true,
  })
}
const getBookSuccess = (state, action) => {
  return updateObject(state, {
    bookData: action.bookData,
    bookError: null,
    loading: false,
  })
}
const getBookFail = (state, action) => {
  return updateObject(state, {
    bookError: action.error,
    loading: false,
  })
}

const getBookStatusStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}
const getBookStatusSuccess = (state, action) => {
  return updateObject(state, {
    bookCopyStatus: action.data,
    error: null,
    loading: false,
  })
}
const getBookStatusFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}
const deleteCopyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    deleteSuccess: false,
  })
}
const deleteCopySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    deleteSuccess: true
  })
}
const deleteCopyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20,
  })
}

const updateCopyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    updateSuccess: false,
  })
}
const updateCopySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    updateSuccess: true
  })
}
const updateCopyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20,
  })
}

const addCopyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addSuccess: false,
  })
}
const addCopySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    addSuccess: true,
    bookCopyData: null
  })
}
const addCopyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    bookCopyData: null,
    loading: false,
    page: 1,
    sizePerPage: 10,
  })
}
const generateBarcodeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    addSuccess: false,
  })
}
const generateBarcodeSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    bookCopyData: action.data
  })
}
const generateBarcodeFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    page: 1,
    sizePerPage: 10,
  })
}

const getCopyTypeStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}
const getCopyTypeSuccess = (state, action) => {
  return updateObject(state, {
    copyTypes: action.data,
    error: null,
    loading: false,
  })
}
const getCopyTypeFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}

const tagRFIDStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    updateSuccess: false,
  })
}
const tagRFIDSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    updateSuccess: true
  })
}
const tagRFIDFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 20,
  })
}

const getCopyByBarcodeStart = (state, action) => {
  return updateObject(state, {
    bookToTagData: [],
  })
}
const getCopyByBarcodeSuccess = (state, action) => {
  return updateObject(state, {
    bookToTagData: action.data,
  })
}
const getCopyByBarcodeFail = (state, action) => {
  return updateObject(state, {
    bookToTagData: []
  })
}

const getCopyByIdStart = (state, action) => {
  return updateObject(state, {
    loading:true,
    error:null,
    copyDetail: null,
  })
}
const getCopyByIdSuccess = (state, action) => {
  return updateObject(state, {
    loading:false,
    copyDetail: action.data,
  })
}
const getCopyByIdFail = (state, action) => {
  return updateObject(state, {
    loading:false,
    error:action.error,
    copyDetail: null,
  })
}

const getLocationStart = (state, action) => {
  return updateObject(state, {
    copyLocation: null,
    error: null,
    loading: true,
  })
}
const getLocationSuccess = (state, action) => {
  return updateObject(state, {
    copyLocation: action.data,
    error: null,
    loading: false,
  })
}
const getLocationFail = (state, action) => {
  return updateObject(state, {
    copyLocation: null,
    error: action.error,
    loading: false,
  })
}


export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  bookData: null,
  bookError: null,
  loading: false,
  page: 1,
  sizePerPage: 10,
  deleteSuccess: false,
  updateSuccess: false,
  addSuccess: false,
  bookCopyData: null,
  bookCopyStatus: null,
  copyTypes: null,
  bookToTagData: [],
  copyDetail: null,
  copyLocation: null,
}, action) {
  switch (action.type) {
    case actionTypes.GET_COPY_BOOK_START: return getCopyStart(state, action)
    case actionTypes.GET_COPY_BOOK_SUCCESS: return getCopySuccess(state, action)
    case actionTypes.GET_COPY_BOOK_FAILED: return getCopyFail(state, action)

    case actionTypes.GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.GET_BOOKS_FAILED: return getBookFail(state, action)

    case actionTypes.GET_BOOK_COPY_STATUS_START: return getBookStatusStart(state, action)
    case actionTypes.GET_BOOK_COPY_STATUS_SUCCESS: return getBookStatusSuccess(state, action)
    case actionTypes.GET_BOOK_COPY_STATUS_FAILED: return getBookStatusFail(state, action)

    case actionTypes.ADD_COPY_BOOK_START: return addCopyStart(state, action)
    case actionTypes.ADD_COPY_BOOK_SUCCESS: return addCopySuccess(state, action)
    case actionTypes.ADD_COPY_BOOK_FAILED: return addCopyFail(state, action)

    case actionTypes.DELETE_COPY_BOOK_START: return deleteCopyStart(state, action)
    case actionTypes.DELETE_COPY_BOOK_FAILED: return deleteCopyFail(state, action)
    case actionTypes.DELETE_COPY_BOOK_SUCCESS: return deleteCopySuccess(state, action)

    case actionTypes.UPDATE_COPY_BOOK_START: return updateCopyStart(state, action)
    case actionTypes.UPDATE_COPY_BOOK_FAILED: return updateCopyFail(state, action)
    case actionTypes.UPDATE_COPY_BOOK_SUCCESS: return updateCopySuccess(state, action)

    case actionTypes.GENERATE_BARCODE_START: return generateBarcodeStart(state, action)
    case actionTypes.GENERATE_BARCODE_FAILED: return generateBarcodeFailed(state, action)
    case actionTypes.GENERATE_BARCODE_SUCCESS: return generateBarcodeSuccess(state, action)

    case actionTypes.GET_COPY_TYPE_START: return getCopyTypeStart(state, action)
    case actionTypes.GET_COPY_TYPE_FAILED: return getCopyTypeFail(state, action)
    case actionTypes.GET_COPY_TYPE_SUCCESS: return getCopyTypeSuccess(state, action)

    case actionTypes.TAG_RFID_START: return tagRFIDStart(state, action)
    case actionTypes.TAG_RFID_FAILED: return tagRFIDFail(state, action)
    case actionTypes.TAG_RFID_SUCCESS: return tagRFIDSuccess(state, action)

    case actionTypes.LIB_GET_BOOKS_BY_BARCODE_START: return getCopyByBarcodeStart(state, action)
    case actionTypes.LIB_GET_BOOKS_BY_BARCODE_SUCCESS: return getCopyByBarcodeSuccess(state, action)
    case actionTypes.LIB_GET_BOOKS_BY_BARCODE_FAILED: return getCopyByBarcodeFail(state, action)

    case actionTypes.LIB_GET_BOOKS_BY_ID_START: return getCopyByIdStart(state, action)
    case actionTypes.LIB_GET_BOOKS_BY_ID_SUCCESS: return getCopyByIdSuccess(state, action)
    case actionTypes.LIB_GET_BOOKS_BY_ID_FAILED: return getCopyByIdFail(state, action)

    case actionTypes.LIB_GET_BOOKCOPY_LOCATIONS_START: return getLocationStart(state, action)
    case actionTypes.LIB_GET_BOOKCOPY_LOCATIONS_FAILED: return getLocationFail(state, action)
    case actionTypes.LIB_GET_BOOKCOPY_LOCATIONS_SUCCESS: return getLocationSuccess(state, action)
  }
  return state
}
