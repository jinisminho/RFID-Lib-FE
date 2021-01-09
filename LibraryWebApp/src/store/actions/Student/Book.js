import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/search'
import { $CombinedState } from 'redux'

export const getBookSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.STUDENT_GET_BOOKS_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getBookFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_BOOKS_FAILED,
        error: error
    }
}

export const getBookStart = () => {
    return {
        type: actionTypes.STUDENT_GET_BOOKS_START
    }
}

export const getBook = (search,page,size) => {
    return dispatch => {
        dispatch(getBookStart())
        let response=prototype.getBooks(search,page,size)
        if(response.status){
            dispatch(getBookSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getBookFailed(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getBookFail(error))
        //     });
    }

}

//get Whislist
export const getWhislistSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.STUDENT_GET_WHISLIST_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getWhislistFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_WHISLIST_FAILED,
        error: error
    }
}

export const getWhislistStart = () => {
    return {
        type: actionTypes.STUDENT_GET_WHISLIST_START
    }
}

export const getWhislist = (search,page,size) => {
    return dispatch => {
        dispatch(getWhislistStart())
        let response=prototype.getWhislist(page,size)
        if(response.status){
            dispatch(getWhislistSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getWhislistFailed(response.err))
        }
    }

}