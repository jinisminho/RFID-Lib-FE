import * as actionTypes from '../actionTypes'
import * as checkoutPrototype from '../../prototype/checkout'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getStudentSuccess = (data) => {
    return {
        type: actionTypes.GET_STUDENT_SUCCESS,
        data: data
    }
}

export const getStudentFailed = (error) => {
    return {
        type: actionTypes.GET_STUDENT_FAILED,
        error: error
    }
}

export const getStudentStart = () => {
    return {
        type: actionTypes.GET_STUDENT_START
    }
}

export const getStudent = (search) => {
    return dispatch => {
        dispatch(getStudentStart())
        let url='/patron/profile/getCheckoutPatron/'+search
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getStudentSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getStudentFailed,error))
            });
    }
}



export const getStudentBookSuccess = (data) => {
    return {
        type: actionTypes.GET_STUDENT_BOOK_SUCCESS,
        bookData: data
    }
}

export const getStudentBookFail = (error) => {
    return {
        type: actionTypes.GET_STUDENT_BOOK_FAILED,
        error: error
    }
}

export const getStudentBookStart = () => {
    return {
        type: actionTypes.GET_STUDENT_BOOK_START
    }
}
export const getStudentBook = (code,id) => {
    return dispatch => {
        dispatch(getStudentBookStart())
        let url='/copy/validate/'+code
        axios.get(url, {withCredentials: true, params:{patronId: id}})
            .then(response => {
                dispatch(getStudentBookSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getStudentBookFail,error))
            });
    }

}


export const checkoutSuccess = () => {
    return {
        type: actionTypes.LIB_CHECKOUT_SUCCESS
    }
}

export const checkoutFailed = (error) => {
    return {
        type: actionTypes.LIB_CHECKOUT_FAILED,
        error: error
    }
}

export const checkoutStart = () => {
    return {
        type: actionTypes.LIB_CHECKOUT_START
    }
}

export const checkout = (studentid,booklist,reason,libid,mail) => {
    return dispatch => {
        dispatch(checkoutStart())
        let checkoutData={
            bookRfidTags:booklist,
            librarianId:libid,
            patronId:studentid,
            checkoutNote:reason
        }
        let url='/librarian/checkout'
        axios.post(url,checkoutData, {withCredentials: true})
            .then(response => {
                dispatch(checkoutSuccess())
                let emailData={
                        ...response.data
                }
                let mailUrl='/mail/checkout?patronEmail='+mail
                axios.post(mailUrl,emailData, {withCredentials: true})
                .catch(error=>{
                    console.log(error)
                })
            })
            .catch(error=> {
                dispatch(responseError(checkoutFailed,error))
            });
    }

}

export const clearData = () => {
    return {
        type: actionTypes.CLEAR_CHECKOUT_DATA
    }
}

export const cancelConfirm = () => {
    return {
        type: actionTypes.CANCEL_CHECKOUT_CONFIRM
    }
}

export const clearBookError = () => {
    return {
        type: actionTypes.CLEAR_BOOK_ERROR
    }

}

export const deleteCheckoutBook = (id) => {
    return {
        type: actionTypes.DELETE_CHECKOUT_BOOK,
        id:id
    }
}

export const getOverdueSuccess = (data) => {
    return {
        type: actionTypes.LIB_GET_OVERDUE_SUCCESS,
        data: data
    }
}

export const getOverdueFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_OVERDUE_FAILED,
        error: error
    }
}

export const getOverdueStart = () => {
    return {
        type: actionTypes.LIB_GET_OVERDUE_START
    }
}

export const getOverdue = (search) => {
    return dispatch => {
        dispatch(getOverdueStart())
        let response=checkoutPrototype.getOverdue(search)
        if(response.status){
            dispatch(getOverdueSuccess(response.data))
        }else{
            dispatch(getOverdueFailed(response.err))
        }
    }

}

export const checkPolicySuccess = (data) => {
    return {
        type: actionTypes.CHECK_POLICY_SUCCESS,
        data: data
    }
}

export const checkPolicyFailed = (error) => {
    return {
        type: actionTypes.CHECK_POLICY_FAILED,
        error: error
    }
}

export const checkPolicyStart = () => {
    return {
        type: actionTypes.CHECK_POLICY_START
    }
}

export const checkPolicy = (data,patronid,libid) => {
    return dispatch => {
        dispatch(checkPolicyStart())
        let rfid=[]
        data.forEach(element => {
            rfid.push(element.copy.rfid)
        })
        let checkData={
            bookRfidTags:rfid,
            librarianId:libid,
            patronId:patronid
        }
        let url='/librarian/checkout/validate'
        axios.post(url,checkData, {withCredentials: true})
            .then(response => {
                let warning=null
                if(response.data.duplicateBook || response.data.haveOverdueCopies || response.data.violatePolicy){
                    warning=response.data.reasons.join(", ")
                }
                dispatch(checkPolicySuccess(warning))
            })
            .catch(error=> {
                dispatch(responseError(checkPolicyFailed,error))
            });
    }

}

export const closeToast = (id) => {
    return {
        type: actionTypes.CLOSE_ERROR_TOAST,
        id:id
    }
}