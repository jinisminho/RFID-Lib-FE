import * as actionTypes from '../actionTypes'
import * as copyPrototype from '../../prototype/bookCopyMng'
import {responseError} from '../../utility'
import axios from '../../../axios'
import { getBookFailed } from './Book'

export const getCopySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_COPY_BOOK_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getCopyFailed = (error) => {
    return {
        type: actionTypes.GET_COPY_BOOK_FAILED,
        error: error
    }
}

export const getCopyStart = () => {
    return {
        type: actionTypes.GET_COPY_BOOK_START
    }
}

export const getCopy = (page, size, search, select) => {
    return dispatch => {
        dispatch(getCopyStart())
        search=search?search:""
        let url='/copy/search'+'?page='+page+'&size='+size+"&searchValue="+search
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getCopySuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(getCopyFailed(responseError(error.response.data.status,error.response.data)))
            });
    }

}

export const getBookCopyStatusSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_SUCCESS,
        data: data,
    }
}

export const getBookCopyStatusFailed = (error) => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_FAILED,
        error: error
    }
}

export const getBookCopyStatusStart = () => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_START
    }
}

export const getBookCopyStatus = () => {
    return dispatch => {
        dispatch(getBookCopyStatusStart())
        let response = copyPrototype.getBookCopyStatus()
        if (response.status) {
            dispatch(getBookCopyStatusSuccess(response.data))
        } else {
            dispatch(getBookCopyStatusFailed(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getCopySuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getCopyFail(error))
        //     });
    }

}

export const getCopyTypeSuccess = (data) => {
    return {
        type: actionTypes.GET_COPY_TYPE_SUCCESS,
        data: data,
    }
}

export const getCopyTypeFailed = (error) => {
    return {
        type: actionTypes.GET_COPY_TYPE_FAILED,
        error: error
    }
}

export const getCopyTypeStart = () => {
    return {
        type: actionTypes.GET_COPY_TYPE_START
    }
}

export const getCopyType = () => {
    return dispatch => {
        dispatch(getCopyTypeStart())
        let url = '/copyType/all'
        axios.get(url, { withCredentials: true })
            .then(response => {
                // response.data.forEach(element => {
                //     element["value"] = element["id"]
                //     element["label"] = element["name"]
                //     delete element["id"]
                //     delete element["name"]
                // });

                dispatch(getCopyTypeSuccess(response.data))
            })
            .catch(error => {
                dispatch(getCopyTypeFailed(responseError(error.response.data.status,error.response.data)))
            });
    }

}

export const addCopyStart = () => {
    return ({
        type: actionTypes.ADD_COPY_BOOK_START
    })
}
export const addCopyFail = (error) => {
    return ({
        type: actionTypes.ADD_COPY_BOOK_FAILED,
        error: error
    })
}
export const addCopySuccess = () => {
    return ({
        type: actionTypes.ADD_COPY_BOOK_SUCCESS
    })
}
export const addCopy = (data) => {
    return dispatch => {
        dispatch(addCopyStart())
        let url='/copy/add'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addCopySuccess())
            })
            .catch(error=> {
                dispatch(addCopyFail(responseError(error.response.data.status,error.response.data)))
            });   
    }
}

export const updateCopyStart = () => {
    return ({
        type: actionTypes.UPDATE_COPY_BOOK_START
    })
}
export const updateCopyFail = (error) => {
    return ({
        type: actionTypes.UPDATE_COPY_BOOK_FAILED,
        error: error
    })
}
export const updateCopySuccess = () => {
    return ({
        type: actionTypes.UPDATE_COPY_BOOK_SUCCESS,
    })
}
export const updateCopy = (data) => {
    return dispatch => {
        dispatch(updateCopyStart())
        let url='/copy/update'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(updateCopySuccess())
            })
            .catch(error=> {
                dispatch(updateCopyFail(responseError(error.response.data.status,error.response.data)))
            });   
    }
}

export const deleteCopyStart = () => {
    return ({
        type: actionTypes.DELETE_COPY_BOOK_START
    })
}
export const deleteCopyFail = (error) => {
    return ({
        type: actionTypes.DELETE_COPY_BOOK_FAILED,
        error: error
    })
}
export const deleteCopySuccess = () => {
    return ({
        type: actionTypes.DELETE_COPY_BOOK_SUCCESS,
    })
}
export const deleteCopy = (id) => {
    return dispatch => {
        dispatch(deleteCopyStart())
        let response = copyPrototype.deleteCopy(id)
        if (response.status == true) {
            dispatch(deleteCopySuccess())
        } else {
            dispatch(deleteCopyFail(response.error))
        }
    }
}

export const getAllBookSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOKS_SUCCESS,
        bookData: data
    }
}

export const getAllBookFail = (error) => {
    return {
        type: actionTypes.GET_BOOKS_FAILED,
        error: error
    }
}

export const getAllBookStart = () => {
    return {
        type: actionTypes.GET_BOOKS_START
    }
}
export const getAllBook = () => {
    return dispatch => {
        dispatch(getAllBookStart())
        let response = copyPrototype.getBooks()
        if (response.status) {
            dispatch(getAllBookSuccess(response.data))
        } else {
            dispatch(getAllBookFail(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getCopySuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getCopyFail(error))
        //     });
    }
}

export const generateBarcodeStart = () => {
    return ({
        type: actionTypes.GENERATE_BARCODE_START
    })
}
export const generateBarcodeFailed = (error) => {
    return ({
        type: actionTypes.GENERATE_BARCODE_FAILED,
        error: error
    })
}
export const generateBarcodeSuccess = (data) => {
    return ({
        type: actionTypes.GENERATE_BARCODE_SUCCESS,
        data: data
    })
}
export const generateBarcode = (data) => {
    return dispatch => {
        dispatch(generateBarcodeStart())
        let url='/librarian/barcodes/generate'
        axios.get(url,{withCredentials: true,params: {
            ...data
          }})
            .then(response => {
                dispatch(generateBarcodeSuccess(response.data))
            })
            .catch(error=> {
                dispatch(generateBarcodeFailed(responseError(error.response.data.status,error.response.data)))
            });   
    }
}

//Tag RFID
export const tagRFIDStart = () => {
    return ({
        type: actionTypes.TAG_RFID_START
    })
}
export const tagRFIDFailed = (error) => {
    return ({
        type: actionTypes.TAG_RFID_FAILED,
        error: error
    })
}
export const tagRFIDSuccess = (data) => {
    return ({
        type: actionTypes.TAG_RFID_SUCCESS,
    })
}
export const tagRFID = (data) => {
    return dispatch => {
        const tagData ={
            barcode:data.barcode,
            rfid:data.rfid,
            updater:data.userid
            }
        dispatch(tagRFIDStart())
        let url = '/copy/tag'
        axios.post(url,tagData, { withCredentials: true })
            .then(response => {
                dispatch(tagRFIDSuccess(response.data))
            })
            .catch(error => {
                dispatch(tagRFIDFailed(responseError(error.response.data.status,error.response.data)))
            });
    }
}

export const getCopyByBarcodeSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIB_GET_BOOKS_BY_BARCODE_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getCopyByBarcodeFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BOOKS_BY_BARCODE_FAILED,
        error: error
    }
}

export const getCopyByBarcodeStart = () => {
    return {
        type: actionTypes.LIB_GET_BOOKS_BY_BARCODE_START
    }
}

export const getCopyByBarcode = (barcode) => {
    return dispatch => {
        dispatch(getCopyByBarcodeStart())
        let url = '/copy/get/barcode/'+barcode
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getCopyByBarcodeSuccess(response.data.book))
            })
            .catch(error => {
                dispatch(getCopyByBarcodeFailed(responseError(error.response.data.status,error.response.data)))
            });
    }

}
