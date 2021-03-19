import * as actionTypes from './actionTypes'
import axios from '../../axios'
import {responseError} from '../utility'
export const getSearchListSuccess = (data) => {
    return {
        type: actionTypes.GET_SEARCH_LIST_SUCCESS,
        data: data
    }
}

export const getSearchListFailed = (error) => {
    return {
        type: actionTypes.GET_SEARCH_LIST_FAILED,
        error: error
    }
}

export const getSearchListStart = () => {
    return {
        type: actionTypes.GET_SEARCH_LIST_START
    }
}

export const getSearchList = (id) => {
    return dispatch => {
        dispatch(getSearchListStart())
        let url='/portableSearch/getCart/'+id
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getSearchListSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getSearchListFailed,error))
            });
    }

}

export const finishSearchBookSuccess = (data) => {
    return {
        type: actionTypes.FINISH_SEARCH_BOOK_SUCCESS,
        data: data
    }
}

export const finishSearchBookFailed = (error) => {
    return {
        type: actionTypes.FINISH_SEARCH_BOOK_FAILED,
        error: error
    }
}

export const finishSearchBookStart = () => {
    return {
        type: actionTypes.FINISH_SEARCH_BOOK_START
    }
}

export const finishSearchBook = (id) => {
    return dispatch => {
        dispatch(finishSearchBookStart())
        let url='/portableSearch/delete/'+id
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(finishSearchBookSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(finishSearchBookFailed,error))
            });
    }

}

export const clearFinish = (id) => {
    return {
        type: actionTypes.CLEAR_FINISH_SEARCH_BOOK
    }

}