import * as actionTypes from '../actionTypes'
import * as returnPrototype from '../../prototype/return'

export const getReturningStudentSuccess = (data) => {
    return {
        type: actionTypes.LIB_RETURN_GET_STUDENT_SUCCESS,
        data: data
    }
}

export const getReturningStudentFailed = (error) => {
    return {
        type: actionTypes.LIB_RETURN_GET_STUDENT_FAILED,
        error: error
    }
}

export const getReturningStudentStart = () => {
    return {
        type: actionTypes.LIB_RETURN_GET_STUDENT_START
    }
}

export const getReturningStudent = (search) => {
    return dispatch => {
        dispatch(getReturningStudentStart())
        let response= returnPrototype.getStudent(search)
        if(response.status){
            dispatch(getReturningStudentSuccess(response.data))
        }else{
            dispatch(getReturningStudentFailed(response.err))
        }
    }

}



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
            dispatch(getReturningBookFail(response.err))
        }
    }

}

