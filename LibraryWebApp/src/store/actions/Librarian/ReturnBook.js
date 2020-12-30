import * as actionTypes from '../actionTypes'
import * as checkoutPrototype from '../../prototype/return'

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

export const getReturningStudent = (search) => {
    console.log("action/ getreturning student")
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

