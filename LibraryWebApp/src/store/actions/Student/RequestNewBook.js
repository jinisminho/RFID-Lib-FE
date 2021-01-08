import * as actionTypes from '../actionTypes'

export const requestNewBookSuccess = () => {
    return {
        type: actionTypes.ST_REQUEST_NEW_BOOK_SUCCESS,
    }
}

export const requestNewBookFailed = (error) => {
    return {
        type: actionTypes.ST_REQUEST_NEW_BOOK_FAILED,
        error: error
    }
}

export const requestNewBookStart = () => {
    return {
        type: actionTypes.ST_REQUEST_NEW_BOOK_START
    }
}

export const refreshRequest = () => {
    return {
        type: actionTypes.ST_REQUEST_NEW_BOOK_REFRESH
    }
}

export const requestNewBook = (isbn) => {
    return dispatch => {
        dispatch(requestNewBookStart())
        let response= {status: true}
        if(response.status){
            dispatch(requestNewBookSuccess())
        }else{
            dispatch(requestNewBookFailed(response.err))
        }
    }
}

export const refreshRequestNewBook = () => {
    return dispatch => {
        dispatch(refreshRequest())
    }
}