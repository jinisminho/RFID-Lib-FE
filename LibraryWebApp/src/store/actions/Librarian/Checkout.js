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
            dispatch(getStudentFailed(response.err))
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
export const getStudentBook = () => {
    return dispatch => {
        dispatch(getStudentBookStart())
        let response=checkoutPrototype.getBook()
        if(response.status){
            dispatch(getStudentBookSuccess(response.data))
        }else{
            dispatch(getStudentBookFail(response.err))
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
