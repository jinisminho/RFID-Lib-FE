import * as actionTypes from './actionTypes'
import axios from '../../axios'
import * as booksPrototype from '../prototype/search'

export const getBooksStart = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_BOOKS_START
    };
}
export const getBooksFailed = (error) => {
    return {
        type: actionTypes.GET_BOOKS_FAILED,
        error: error
    }
}
export const getBooksSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_BOOKS_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    };
}
export const getBooks = (page,size,searchStr) => {
    return dispatch => {
        dispatch(getBooksStart());
        let response = booksPrototype.getBooks(searchStr)
        if (response.status) {
            dispatch(getBooksSuccess(response.data,0,page,size))
        } else {
            dispatch(getBooksFailed(response.err))
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