import * as actionTypes from '../actionTypes'
import * as studentPrototype from '../../prototype/studentMng'

export const getAdminStudentSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getAdminStudentFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_FAILED,
        error: error
    }
}

export const getAdminStudentStart = () => {
    return {
        type: actionTypes.ADMIN_GET_STUDENT_START
    }
}

export const getAdminStudent = (page,size,search) => {
    return dispatch => {
        dispatch(getAdminStudentStart())
        let response=studentPrototype.getStudent(search,page,size)
        if(response.status){
            dispatch(getAdminStudentSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getAdminStudentFailed(response.err))
        }
    }

}


export const addStudentStart =()=>{
    return({
        type: actionTypes.ADD_STUDENT_START
    })
} 
export const addStudentFail =(error)=>{
    return({
        type: actionTypes.ADD_STUDENT_FAILED,
        error:error
    })
} 
export const addStudentSuccess =()=>{
    return({
        type: actionTypes.ADD_STUDENT_SUCCESS,
    })
} 
export const addStudent = (data) => {
    return dispatch => {
        dispatch(addStudentStart())    
        let response=studentPrototype.addStudent(data)
        if(response.status==true){
            dispatch(addStudentSuccess())
        }else{
            dispatch(addStudentFail(response.error))
        }
    }
}

export const updateStudentStart =()=>{
    return({
        type: actionTypes.UPDATE_STUDENT_START
    })
} 
export const updateStudentFail =(error)=>{
    return({
        type: actionTypes.UPDATE_STUDENT_FAILED,
        error:error
    })
} 
export const updateStudentSuccess =()=>{
    return({
        type: actionTypes.UPDATE_STUDENT_SUCCESS,
    })
} 
export const updateStudent = (data) => {
    return dispatch => {
        dispatch(updateStudentStart())    
        let response=studentPrototype.updateStudent(data)
        if(response.status==true){
            dispatch(updateStudentSuccess())
        }else{
            dispatch(updateStudentFail(response.error))
        }
    }
}

export const changeStatusStudentStart =()=>{
    return({
        type: actionTypes.CHANGE_STATUS_STUDENT_START
    })
} 
export const changeStatusStudentFail =(error)=>{
    return({
        type: actionTypes.CHANGE_STATUS_STUDENT_FAILED,
        error:error
    })
} 
export const changeStatusStudentSuccess =()=>{
    return({
        type: actionTypes.CHANGE_STATUS_STUDENT_SUCCESS,
    })
} 
export const changeStatusStudent = (id,status) => {
    return dispatch => {
        dispatch(changeStatusStudentStart())    
        let response=studentPrototype.changeStatusStudent(id,status)
        if(response.status==true){
            dispatch(changeStatusStudentSuccess())
        }else{
            dispatch(changeStatusStudentFail(response.error))
        }
    }
}