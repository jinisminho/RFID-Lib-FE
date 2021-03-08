import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'

//patron
const getPatronTypesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getPatronTypesSuccess = (state, action) => {
    return updateObject(state, {
        patronTypes: action.data,
        patronTotal: action.total,
        patronPage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getPatronTypesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//update patron type
const updatePatronTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const updatePatronTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Patron type successfully updated",
        loading: false,
    })
}
const updatePatronTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//add patron type
const addPatronTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const addPatronTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Patron type successfully added",
        loading: false,
    })
}
const addPatronTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//delete patron type
const deletePatronTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const deletePatronTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Patron type successfully deleted",
        loading: false,
    })
}
const deletePatronTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//bookCopy
const getBookCopyTypesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getBookCopyTypesSuccess = (state, action) => {
    return updateObject(state, {
        bookCopyTypes: action.data,
        bookCopyTotal: action.total,
        bookCopyPage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getBookCopyTypesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//update book copy type
const updateBookCopyTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const updateBookCopyTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Book copy type successfully updated",
        loading: false,
    })
}
const updateBookCopyTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//add book copy type
const addBookCopyTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const addBookCopyTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Book copy type successfully added",
        loading: false,
    })
}
const addBookCopyTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//delete book copy type
const deleteBookCopyTypeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const deleteBookCopyTypeSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Book copy type successfully deleted",
        loading: false,
    })
}
const deleteBookCopyTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

export default function reducer(state = {
    error: null,
    loading: false,
    patronTotal: 0,
    bookCopyTotal: 0,
    patronPage: 1,
    bookCopyPage: 1,
    sizePerPage: 10,
    successMsg: null,
    patronTypes: null,
    bookCopyTypes:null,
}, action) {
    switch (action.type) {

        //Patron
        case actionTypes.COMMON_GET_PATRON_TYPES_PAGE_START: return getPatronTypesStart(state, action)
        case actionTypes.COMMON_GET_PATRON_TYPES_PAGE_SUCCESS: return getPatronTypesSuccess(state, action)
        case actionTypes.COMMON_GET_PATRON_TYPES_PAGE_FAILED: return getPatronTypesFail(state, action)

        case actionTypes.COMMON_UPDATE_PATRON_TYPE_START: return updatePatronTypeStart(state, action)
        case actionTypes.COMMON_UPDATE_PATRON_TYPE_SUCCESS: return updatePatronTypeSuccess(state, action)
        case actionTypes.COMMON_UPDATE_PATRON_TYPE_FAILED: return updatePatronTypeFail(state, action)

        case actionTypes.COMMON_ADD_PATRON_TYPE_START: return addPatronTypeStart(state, action)
        case actionTypes.COMMON_ADD_PATRON_TYPE_SUCCESS: return addPatronTypeSuccess(state, action)
        case actionTypes.COMMON_ADD_PATRON_TYPE_FAILED: return addPatronTypeFail(state, action)

        case actionTypes.COMMON_DELETE_PATRON_TYPE_START: return deletePatronTypeStart(state, action)
        case actionTypes.COMMON_DELETE_PATRON_TYPE_SUCCESS: return deletePatronTypeSuccess(state, action)
        case actionTypes.COMMON_DELETE_PATRON_TYPE_FAILED: return deletePatronTypeFail(state, action)

        //Book Copy
        case actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_START: return getBookCopyTypesStart(state, action)
        case actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_SUCCESS: return getBookCopyTypesSuccess(state, action)
        case actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_FAILED: return getBookCopyTypesFail(state, action)

        case actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_START: return updateBookCopyTypeStart(state, action)
        case actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_SUCCESS: return updateBookCopyTypeSuccess(state, action)
        case actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_FAILED: return updateBookCopyTypeFail(state, action)

        case actionTypes.COMMON_ADD_BOOK_COPY_TYPE_START: return addBookCopyTypeStart(state, action)
        case actionTypes.COMMON_ADD_BOOK_COPY_TYPE_SUCCESS: return addBookCopyTypeSuccess(state, action)
        case actionTypes.COMMON_ADD_BOOK_COPY_TYPE_FAILED: return addBookCopyTypeFail(state, action)

        case actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_START: return deleteBookCopyTypeStart(state, action)
        case actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_SUCCESS: return deleteBookCopyTypeSuccess(state, action)
        case actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_FAILED: return deleteBookCopyTypeFail(state, action)
        
    }
    return state
}
