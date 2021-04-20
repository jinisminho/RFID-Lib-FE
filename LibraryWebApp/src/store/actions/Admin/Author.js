import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getAuthorSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_AUTHOR_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getAuthorFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_AUTHOR_FAILED,
        error: error
    }
}

export const getAuthorStart = () => {
    return {
        type: actionTypes.ADMIN_GET_AUTHOR_START
    }
}

export const getAuthor = (page,size,search) => {
    return dispatch => {
        dispatch(getAuthorStart())
        search=search?search:""
        let url='/author/search'+'?page='+page+'&size='+size+"&name="+search
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getAuthorSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getAuthorFailed,error))
            });
    }

}


export const addAuthorStart =()=>{
    return({
        type: actionTypes.ADD_AUTHOR_START
    })
} 
export const addAuthorFail =(error)=>{
    return({
        type: actionTypes.ADD_AUTHOR_FAILED,
        error:error
    })
} 
export const addAuthorSuccess =()=>{
    return({
        type: actionTypes.ADD_AUTHOR_SUCCESS,
    })
} 
export const addAuthor = (data) => {
    return dispatch => {
        dispatch(addAuthorStart())    
        let url='/author/create'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addAuthorSuccess())
            })
            .catch(error=> {
                dispatch(responseError(addAuthorFail,error))
            });   
    }
}

export const updateAuthorStart =()=>{
    return({
        type: actionTypes.UPDATE_AUTHOR_START
    })
} 
export const updateAuthorFail =(error)=>{
    return({
        type: actionTypes.UPDATE_AUTHOR_FAILED,
        error:error
    })
} 
export const updateAuthorSuccess =()=>{
    return({
        type: actionTypes.UPDATE_AUTHOR_SUCCESS,
    })
} 
export const updateAuthor = (data) => {
    return dispatch => {
        dispatch(updateAuthorStart())    
        let url='/author/update?authorId='+data["authorId"]
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(updateAuthorSuccess())
            })
            .catch(error=> {
                dispatch(responseError(updateAuthorFail,error))
            });   
    }
}

export const deleteAuthorStart =()=>{
    return({
        type: actionTypes.DELETE_AUTHOR_START
    })
} 
export const deleteAuthorFail =(error)=>{
    return({
        type: actionTypes.DELETE_AUTHOR_FAILED,
        error:error
    })
} 
export const deleteAuthorSuccess =()=>{
    return({
        type: actionTypes.DELETE_AUTHOR_SUCCESS,
    })
} 
export const deleteAuthor = (id) => {
    return dispatch => {
        dispatch(deleteAuthorStart())    
        let url = "author/delete?authorId="+id
        axios.post(url,{},{ withCredentials: true })
            .then(response => {
                dispatch(deleteAuthorSuccess())
            })
            .catch(error=> {
                dispatch(responseError(deleteAuthorFail,error))
            });   
    }
}