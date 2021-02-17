import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getStaffSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_STAFF_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getStaffFailed = (error) => {
    return {
        type: actionTypes.GET_STAFF_FAILED,
        error: error
    }
}

export const getStaffStart = () => {
    return {
        type: actionTypes.GET_STAFF_START
    }
}

export const getStaff = (page,size,search) => {
    return dispatch => {
        dispatch(getStaffStart())
        search=search?search:""
        let url='/account/librarian/find'+'?page='+page+'&size='+size+"&email="+search
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getStaffSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(getStaffFailed(responseError(error)))
            });
    }

}


export const addStaffStart =()=>{
    return({
        type: actionTypes.ADD_STAFF_START
    })
} 
export const addStaffFail =(error)=>{
    return({
        type: actionTypes.ADD_STAFF_FAILED,
        error:error
    })
} 
export const addStaffSuccess =()=>{
    return({
        type: actionTypes.ADD_STAFF_SUCCESS,
    })
} 
export const addStaff = (data) => {
    return dispatch => {
        dispatch(addStaffStart())    
        let url='/account/librarian/create'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addStaffSuccess())
            })
            .catch(error=> {
                dispatch(addStaffFail(responseError(error)))
            });   
    }
}

export const updateStaffStart =()=>{
    return({
        type: actionTypes.UPDATE_STAFF_START
    })
} 
export const updateStaffFail =(error)=>{
    return({
        type: actionTypes.UPDATE_STAFF_FAILED,
        error:error
    })
} 
export const updateStaffSuccess =()=>{
    return({
        type: actionTypes.UPDATE_STAFF_SUCCESS,
    })
} 
export const updateStaff = (data) => {
    return dispatch => {
        dispatch(updateStaffStart())    
        let url='/account/librarian/update'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(updateStaffSuccess())
            })
            .catch(error=> {
                dispatch(updateStaffFail(responseError(error)))
            });   
    }
}

export const changeStatusStaffStart =()=>{
    return({
        type: actionTypes.CHANGE_STATUS_STAFF_START
    })
} 
export const changeStatusStaffFail =(error)=>{
    return({
        type: actionTypes.CHANGE_STATUS_STAFF_FAILED,
        error:error
    })
} 
export const changeStatusStaffSuccess =()=>{
    return({
        type: actionTypes.CHANGE_STATUS_STAFF_SUCCESS,
    })
} 
export const changeStatusStaff = (id,status) => {
    return dispatch => {
        dispatch(changeStatusStaffStart())    
        let url = ""
        if(status){
            url="/account/activate?id="+id
        }else{
            url="/account/deactivate?id="+id
        }
        axios.post(url,{},{ withCredentials: true })
            .then(response => {
                dispatch(changeStatusStaffSuccess())
            })
            .catch(error=> {
                dispatch(changeStatusStaffFail(responseError(error)))
            });   
    }
}