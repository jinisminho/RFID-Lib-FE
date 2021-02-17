import * as actionTypes from '../actionTypes'
import * as returnPrototype from '../../prototype/return'
import axios from '../../../axios'
import {responseError} from '../../utility'


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

export const getReturningBook = (rfid) => {
    return dispatch => {
        dispatch(getReturningBookStart())
        let url='/librarian/return/validate?rfid='+rfid
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getReturningBookSuccess(response.data))
            })
            .catch(error=> {
                dispatch(getReturningBookFail(responseError(error.response.data.status,error.response.data)))
            });
    }

}

export const returnBookSuccess = () => {
    return {
        type: actionTypes.LIB_RETURN_BOOK_SUCCESS
    }
}

export const returnBookFail = (error) => {
    return {
        type: actionTypes.LIB_RETURN_BOOK_FAILED,
        error: error
    }
}

export const returnBookStart = () => {
    return {
        type: actionTypes.LIB_RETURN_BOOK_START
    }
}

export const returnBook = (data,libid) => {
    return dispatch => {
        dispatch(returnBookStart())
        let rfid=[]
        data.forEach(element => {
            rfid.push(element.rfid)
        });
        let url='/librarian/return'
        let returnData={
            bookRfidTags:rfid,
            librarianId:libid,
            patronId:null
        }
        axios.post(url,returnData, {withCredentials: true})
            .then(response => {
                dispatch(returnBookSuccess())
                console.log(response.data)
                let emailData={
                    ...response.data
            }
            let mailUrl='/mail/return'
            axios.post(mailUrl,emailData, {withCredentials: true})
            .catch(error=>{
                console.log(error)
            })

            })
            .catch(error=> {
                dispatch(returnBookFail(responseError(error.response.data.status,error.response.data)))
            });
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

export const deleteReturnBook = (id) => {
    return {
        type: actionTypes.DELETE_RETURN_BOOK,
        id:id
    }
}