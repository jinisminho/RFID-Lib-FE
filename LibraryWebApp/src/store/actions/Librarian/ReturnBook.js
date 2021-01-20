import * as actionTypes from '../actionTypes'
import * as returnPrototype from '../../prototype/return'



export const getReturningBookSuccess = (data) => {
    return {
        type: actionTypes.LIB_RETURN_GET_BOOK_SUCCESS,
        bookData: data
    }
}

export const getReturningBookFail = (error) => {
    return {
        type: actionTypes.LIB_RETURN_GET_BOOK_FAILED,
        error: error
    }
}

export const getReturningBookStart = () => {
    return {
        type: actionTypes.LIB_RETURN_GET_BOOK_START
    }
}

export const getReturningBook = (search) => {
    return dispatch => {
        dispatch(getReturningBookStart())
        let response=returnPrototype.getBook(search)
        if(response.status){
            dispatch(getReturningBookSuccess(response.data))
        }else{
            dispatch(getReturningBookFail(response.error))
        }
    }

}


export const clearBook = () => {
    return {
        type: actionTypes.CLEAR_RETURN_BOOK
    }

}

export const clearReturnBookError = () => {
    return {
        type: actionTypes.CLEAR_RETURN_BOOK_ERROR
    }

}