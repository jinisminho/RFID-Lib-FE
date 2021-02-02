import * as actionTypes from '../actionTypes'
import * as checkoutPrototype from '../../prototype/checkout'

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
        let response=checkoutPrototype.getStudent(search)
        if(response.status){
            dispatch(getStudentSuccess(response.data))
        }else{
            dispatch(getStudentFailed(response.error))
        }
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
export const getStudentBook = (code) => {
    return dispatch => {
        dispatch(getStudentBookStart())
        let response=checkoutPrototype.getBook(code)
        if(response.status){
            dispatch(getStudentBookSuccess(response.data))
        }else{
            dispatch(getStudentBookFail(response.error))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getStudentSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getStudentFail(error))
        //     });
    }

}


export const checkoutSuccess = (data) => {
    return {
        type: actionTypes.LIB_CHECKOUT_SUCCESS,
        data: data
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

export const checkout = (studentid,booklist) => {
    return dispatch => {
        dispatch(checkoutStart())
        let response=checkoutPrototype.checkout(studentid,booklist)
        if(response.status){
            dispatch(checkoutSuccess())
        }else{
            dispatch(checkoutFailed(response.err))
        }
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

export const checkPolicy = (data) => {
    return dispatch => {
        dispatch(checkPolicyStart())
        let response=checkoutPrototype.checkPolicy(data)
        if(response.status){
            dispatch(checkPolicySuccess(response.warning))
        }else{
            dispatch(checkPolicyFailed(response.err))
        }
    }

}