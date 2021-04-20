import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getPositionSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_POSITION_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getPositionFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_POSITION_FAILED,
        error: error
    }
}

export const getPositionStart = () => {
    return {
        type: actionTypes.ADMIN_GET_POSITION_START
    }
}

export const getPosition = (page,size,search) => {
    return dispatch => {
        dispatch(getPositionStart())
        search=search?search:""
        let url='/position/all'+'?page='+page+'&size='+size
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getPositionSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getPositionFailed,error))
            });
    }

}


export const addPositionStart =()=>{
    return({
        type: actionTypes.ADD_POSITION_START
    })
} 
export const addPositionFail =(error)=>{
    return({
        type: actionTypes.ADD_POSITION_FAILED,
        error:error
    })
} 
export const addPositionSuccess =()=>{
    return({
        type: actionTypes.ADD_POSITION_SUCCESS,
    })
} 
export const addPosition = (data) => {
    return dispatch => {
        dispatch(addPositionStart())    
        let url='/position/create'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addPositionSuccess())
            })
            .catch(error=> {
                dispatch(responseError(addPositionFail,error))
            });   
    }
}

export const updatePositionStart =()=>{
    return({
        type: actionTypes.UPDATE_POSITION_START
    })
} 
export const updatePositionFail =(error)=>{
    return({
        type: actionTypes.UPDATE_POSITION_FAILED,
        error:error
    })
} 
export const updatePositionSuccess =()=>{
    return({
        type: actionTypes.UPDATE_POSITION_SUCCESS,
    })
} 
export const updatePosition = (data) => {
    return dispatch => {
        dispatch(updatePositionStart())    
        let url='/position/update?posId='+data["id"]
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(updatePositionSuccess())
            })
            .catch(error=> {
                dispatch(responseError(updatePositionFail,error))
            });   
    }
}

export const deletePositionStart =()=>{
    return({
        type: actionTypes.DELETE_POSITION_START
    })
} 
export const deletePositionFail =(error)=>{
    return({
        type: actionTypes.DELETE_POSITION_FAILED,
        error:error
    })
} 
export const deletePositionSuccess =()=>{
    return({
        type: actionTypes.DELETE_POSITION_SUCCESS,
    })
} 
export const deletePosition = (id) => {
    return dispatch => {
        dispatch(deletePositionStart())    
        let url = "position/delete?posId="+id
        axios.post(url,{},{ withCredentials: true })
            .then(response => {
                dispatch(deletePositionSuccess())
            })
            .catch(error=> {
                dispatch(responseError(deletePositionFail,error))
            });   
    }
}