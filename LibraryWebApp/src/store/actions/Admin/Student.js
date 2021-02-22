import * as actionTypes from '../actionTypes'
import * as studentPrototype from '../../prototype/studentMng'
import axios from '../../../axios'
import {responseError} from '../../utility'
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
        search=search?search:""
        let url='/account/patron/find'+'?page='+page+'&size='+size+"&email="+search
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getAdminStudentSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(getAdminStudentFailed(responseError(error)))
            });
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
        let url='/account/patron/create'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addStudentSuccess())
            })
            .catch(error=> {
                dispatch(addStudentFail(responseError(error)))
            });   
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
        let url='/account/patron/update'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(updateStudentSuccess())
            })
            .catch(error=> {
                dispatch(updateStudentFail(responseError(error)))
            });   
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
        let url = ""
        if(status){
            url="/account/activate?id="+id
        }else{
            url="/account/deactivate?id="+id
        }
        axios.post(url,{},{ withCredentials: true })
            .then(response => {
                dispatch(changeStatusStudentSuccess())
            })
            .catch(error=> {
                dispatch(changeStatusStudentFail(responseError(error)))
            });   
    }
}

export const getAllPatronTypeSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_PATRON_TYPE_SUCCESS,
        data: data,
    }
}

export const getAllPatronTypeFailed = (error) => {
    return {
        type: actionTypes.GET_ALL_PATRON_TYPE_FAILED,
        error: error
    }
}

export const getAllPatronTypeStart = () => {
    return {
        type: actionTypes.GET_ALL_PATRON_TYPE_START
    }
}

export const getAllPatronType = () => {
    return dispatch => {
        dispatch(getAllPatronTypeStart())
        let url = '/patronType/getAll'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getAllPatronTypeSuccess(response.data))
            })
            .catch(error => {
                dispatch(getAllPatronTypeFailed(responseError(error)))
            });
    }

}