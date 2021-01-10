import * as actionTypes from '../actionTypes'
import * as staffPrototype from '../../prototype/staffMng'

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
        let response=staffPrototype.getStaff(search,page,size)
        if(response.status){
            dispatch(getStaffSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getStaffFailed(response.err))
        }
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
        let response=staffPrototype.addStaff(data)
        if(response.status==true){
            dispatch(addStaffSuccess())
        }else{
            dispatch(addStaffFail(response.error))
        }
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
        let response=staffPrototype.updateStaff(data)
        if(response.status==true){
            dispatch(updateStaffSuccess())
        }else{
            dispatch(updateStaffFail(response.error))
        }
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
        let response=staffPrototype.changeStatusStaff(id,status)
        if(response.status==true){
            dispatch(changeStatusStaffSuccess())
        }else{
            dispatch(changeStatusStaffFail(response.error))
        }
    }
}