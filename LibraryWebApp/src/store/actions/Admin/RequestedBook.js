import * as actionTypes from '../actionTypes'
import * as booksPrototype from '../../prototype/requestedBooksPrototype'

export const getRequestedBookSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getRequestedBookFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_FAILED,
        error: error
    }
}

export const getRequestedBookStart = () => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_START
    }
}

export const getRequestedBooks = (page, size, search) => {
    return dispatch => {
        dispatch(getRequestedBookStart())
        let response = booksPrototype.getRequestedBooks(search, page, size)
        if (response.status) {
            dispatch(getRequestedBookSuccess(response.data, response.total, page, size))
        } else {
            dispatch(getRequestedBookFailed(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getBookFail(error))
        //     });
    }
}


export const deleteRequestedBookStart = () => {
    return ({
        type: actionTypes.DELETE_BOOK_START
    })
}
export const deleteRequestedBookFail = (error) => {
    return ({
        type: actionTypes.DELETE_BOOK_FAILED,
        error: error
    })
}
export const deleteRequestedBookSuccess = () => {
    return ({
        type: actionTypes.DELETE_BOOK_SUCCESS,
    })
}
export const deleteRequestedBook = (id) => {
    return dispatch => {
        dispatch(deleteRequestedBookStart())
        let response = booksPrototype.deleteRequestedBook(id)
        if (response.status == true) {
            dispatch(deleteRequestedBookSuccess())
        } else {
            dispatch(deleteRequestedBookFail(response.error))
        }
    }
}
