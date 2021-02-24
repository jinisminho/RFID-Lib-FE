import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/bookStudent'
import { $CombinedState } from 'redux'
import axios from '../../../axios'
import {responseError} from '../../utility'



export const getBookSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BOOKS_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getBookFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_BOOKS_FAILED,
        error: error
    }
}

export const getBookStart = () => {
    return {
        type: actionTypes.PATRON_GET_BOOKS_START
    }
}

export const getBook = (search,page,size) => {
    return dispatch => {
        search=search?search:""
        dispatch(getBookStart())
        let url='/book/search'+'?page='+page+'&size='+size+"&searchValue="+search
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(getBookFailed(responseError(error)))
            });
    }

}

