import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'

//Shelves
const getShelvesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        bookError: null,
        initPos: null,
        lines: null,
    })
}
const getShelvesSuccess = (state, action) => {
    return updateObject(state, {
        shelves: action.data,
        error: null,
        loading: false,
    })
}
const getShelvesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        bookError: null,
        bookLoading: false,
    })
}

//Lines
const getLinesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        bookError: null,
    })
}
const getLinesSuccess = (state, action) => {
    return updateObject(state, {
        lines: action.data,
        error: null,
        loading: false,
    })
}
const getLinesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        bookError: null,
        bookLoading: false,
    })
}

//save Sampled Position
const saveSampledPositionStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        bookError: null,
    })
}
const saveSampledPositionSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "The location is indexed successfully.",
        loading: false,
    })
}
const saveSampledPositionFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        bookError: null,
        bookLoading: false,
    })
}

//Init pos
const getInitialPositionsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        bookError: null,
    })
}
const getInitialPositionsSuccess = (state, action) => {
    return updateObject(state, {
        initPos: action.data,
        error: null,
        loading: false,
    })
}
const getInitialPositionsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        bookError: null,
        bookLoading: false,
    })
}

//Scanned book
const getScannedBookStart = (state, action) => {
    return updateObject(state, {
        bookError: null,
        bookLoading: true,
        error: null,
        successMsg: null,
        loading: true,
    })
}
const getScannedBookSuccess = (state, action) => {
    let bookList = state.bookData ? (!state.bookData.includes(action.bookData) ? [...state.bookData, action.bookData] : state.bookData) : [...[], action.bookData]
    return updateObject(state, {
        bookData: bookList,
        bookError: null,
        bookLoading: false,
    })
}
const getScannedBookFail = (state, action) => {
    return updateObject(state, {
        bookError: action.error,
        bookLoading: false,
        successMsg: null,
        loading: false,
    })
}

//Clear scanned
const clearScannedBook = (state, action) => {
    return updateObject(state, {
        bookData: null,
        bookError: null,
        bookLoading: false,
        error: null,
        successMsg: null,
        loading: false,
    })
}

//Shelf + Line by RFID
const getPositionByRFIDStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        bookError: null,
    })
}
const getPositionByRFIDSuccess = (state, action) => {
    return updateObject(state, {
        position: action.data,
        error: null,
        loading: false,
    })
}
const getPositionByRFIDFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        bookError: null,
        bookLoading: false,
    })
}

export default function reducer(state = {
    error: null,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    successMsg: null,
    data: null,
    shelves: null,
    lines: null,
    initPos: null,
    bookData: null,
    bookError: null,
    bookLoading: false,
    position: null,
}, action) {
    switch (action.type) {

        case actionTypes.COMMON_GET_SHELVES_START: return getShelvesStart(state, action)
        case actionTypes.COMMON_GET_SHELVES_SUCCESS: return getShelvesSuccess(state, action)
        case actionTypes.COMMON_GET_SHELVES_FAILED: return getShelvesFail(state, action)

        case actionTypes.COMMON_GET_LINES_START: return getLinesStart(state, action)
        case actionTypes.COMMON_GET_LINES_SUCCESS: return getLinesSuccess(state, action)
        case actionTypes.COMMON_GET_LINES_FAILED: return getLinesFail(state, action)

        case actionTypes.COMMON_SAVE_SAMPLED_POSITION_START: return saveSampledPositionStart(state, action)
        case actionTypes.COMMON_SAVE_SAMPLED_POSITION_SUCCESS: return saveSampledPositionSuccess(state, action)
        case actionTypes.COMMON_SAVE_SAMPLED_POSITION_FAILED: return saveSampledPositionFail(state, action)

        case actionTypes.COMMON_GET_INIT_POS_START: return getInitialPositionsStart(state, action)
        case actionTypes.COMMON_GET_INIT_POS_SUCCESS: return getInitialPositionsSuccess(state, action)
        case actionTypes.COMMON_GET_INIT_POS_FAILED: return getInitialPositionsFail(state, action)

        case actionTypes.COMMON_GET_SCANNED_BOOK_START: return getScannedBookStart(state, action)
        case actionTypes.COMMON_GET_SCANNED_BOOK_SUCCESS: return getScannedBookSuccess(state, action)
        case actionTypes.COMMON_GET_SCANNED_BOOK_FAILED: return getScannedBookFail(state, action)

        case actionTypes.CLEAR_SCANNED_BOOK: return clearScannedBook(state, action)

        case actionTypes.COMMON_GET_POSITION_RFID_START: return getPositionByRFIDStart(state, action)
        case actionTypes.COMMON_GET_POSITION_RFID_SUCCESS: return getPositionByRFIDSuccess(state, action)
        case actionTypes.COMMON_GET_POSITION_RFID_FAILED: return getPositionByRFIDFailed(state, action)
    }
    return state
}
