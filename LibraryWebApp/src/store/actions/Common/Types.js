import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import { responseError } from '../../utility'

//Patron
export const getPatronTypesSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.COMMON_GET_PATRON_TYPES_PAGE_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getPatronTypesFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_PATRON_TYPES_PAGE_FAILED,
        error: error
    }
}

export const getPatronTypesStart = () => {
    return {
        type: actionTypes.COMMON_GET_PATRON_TYPES_PAGE_START
    }
}

export const getPatronTypes = (page, size, searchValue) => {
    return dispatch => {
        dispatch(getPatronTypesStart())

        let url = '/patronType/find' + '?page=' + page + '&size=' + size + (searchValue ? ('&name=' + searchValue) : '')
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getPatronTypesSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getPatronTypesFailed,error))
            });
    }

}

//Update patron type

export const updatePatronTypeStart = () => {
    return ({
        type: actionTypes.COMMON_UPDATE_PATRON_TYPE_START
    })
}
export const updatePatronTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_UPDATE_PATRON_TYPE_FAILED,
        error: error
    })
}
export const updatePatronTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_UPDATE_PATRON_TYPE_SUCCESS,
    })
}

export const updatePatronType = (data) => {
    return dispatch => {
        dispatch(updatePatronTypeStart())

        let url = '/patronType/update/' + data.id
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(updatePatronTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(updatePatronTypeFail,error))
            });
    }
}

//Add patron type

export const addPatronTypeStart = () => {
    return ({
        type: actionTypes.COMMON_ADD_PATRON_TYPE_START
    })
}
export const addPatronTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_ADD_PATRON_TYPE_FAILED,
        error: error
    })
}
export const addPatronTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_ADD_PATRON_TYPE_SUCCESS,
    })
}

export const addPatronType = (data) => {
    return dispatch => {
        dispatch(addPatronTypeStart())

        let url = '/patronType/add'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(addPatronTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(addPatronTypeFail,error))
            });
    }
}

//Delete patron type

export const deletePatronTypeStart = () => {
    return ({
        type: actionTypes.COMMON_DELETE_PATRON_TYPE_START
    })
}
export const deletePatronTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_DELETE_PATRON_TYPE_FAILED,
        error: error
    })
}
export const deletePatronTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_DELETE_PATRON_TYPE_SUCCESS,
    })
}

export const deletePatronType = (id) => {
    return dispatch => {
        dispatch(deletePatronTypeStart())

        let url = '/patronType/delete/'+ id
        axios.post(url, {}, { withCredentials: true })
            .then(response => {
                dispatch(deletePatronTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(deletePatronTypeFail,error))
            });
    }
}

//
//Book Copy
export const getBookCopyTypesSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBookCopyTypesFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_FAILED,
        error: error
    }
}

export const getBookCopyTypesStart = () => {
    return {
        type: actionTypes.COMMON_GET_BOOK_COPY_TYPES_PAGE_START
    }
}

export const getBookCopyTypes = (page, size,searchValue) => {
    return dispatch => {
        dispatch(getBookCopyTypesStart())

        let url = '/copyType/find' + '?page=' + page + '&size=' + size + (searchValue ? ('&name=' + searchValue) : '')
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getBookCopyTypesSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getBookCopyTypesFailed,error))
            });
    }

}

//Update book copy type

export const updateBookCopyTypeStart = () => {
    return ({
        type: actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_START
    })
}
export const updateBookCopyTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_FAILED,
        error: error
    })
}
export const updateBookCopyTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_UPDATE_BOOK_COPY_TYPE_SUCCESS,
    })
}

export const updateBookCopyType = (data) => {
    return dispatch => {
        dispatch(updateBookCopyTypeStart())

        let url = '/copyType/update/' + data.id
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(updateBookCopyTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(updateBookCopyTypeFail,error))
            });
    }
}

//Add patron type

export const addBookCopyTypeStart = () => {
    return ({
        type: actionTypes.COMMON_ADD_BOOK_COPY_TYPE_START
    })
}
export const addBookCopyTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_ADD_BOOK_COPY_TYPE_FAILED,
        error: error
    })
}
export const addBookCopyTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_ADD_BOOK_COPY_TYPE_SUCCESS,
    })
}

export const addBookCopyType = (data) => {
    return dispatch => {
        dispatch(addBookCopyTypeStart())

        let url = '/copyType/add'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(addBookCopyTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(addBookCopyTypeFail,error))
            });
    }
}

//Delete patron type

export const deleteBookCopyTypeStart = () => {
    return ({
        type: actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_START
    })
}
export const deleteBookCopyTypeFail = (error) => {
    return ({
        type: actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_FAILED,
        error: error
    })
}
export const deleteBookCopyTypeSuccess = () => {
    return ({
        type: actionTypes.COMMON_DELETE_BOOK_COPY_TYPE_SUCCESS,
    })
}

export const deleteBookCopyType = (id) => {
    return dispatch => {
        dispatch(deleteBookCopyTypeStart())

        let url = '/copyType/delete/'+ id
        axios.post(url, {}, { withCredentials: true })
            .then(response => {
                dispatch(deleteBookCopyTypeSuccess())
            })
            .catch(error => {
                dispatch(responseError(deleteBookCopyTypeFail,error))
            });
    }
}

//get Copy Types

export const getAllCpyTypesSuccess = (data) => {
    return {
        type: actionTypes.COMMON_GET_ALL_CPY_TYPE_SUCCESS,
        data: data,
    }
}

export const getAllCpyTypesFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_ALL_CPY_TYPE_FAILED,
        error: error
    }
}

export const getAllCpyTypesStart = () => {
    return {
        type: actionTypes.COMMON_GET_ALL_CPY_TYPE_START
    }
}

export const getAllCpyTypes = () => {
    return dispatch => {
        dispatch(getAllCpyTypesStart())

        let url = '/copyType/getAll'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getAllCpyTypesSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getAllCpyTypesFailed,error))
            });

    }

}