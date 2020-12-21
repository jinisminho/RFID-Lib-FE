import * as actionTypes from './actionTypes'
import axios from '../../axios'
import * as booksPrototype from '../prototype/mockDataBooks'

export const getBooksStart = ()=>{
    return{
        type: actionTypes.GET_BOOKS_START
    };
}
export const getBooksFailed =(error) =>{
    return{
        type: actionTypes.GET_BOOKS_FAILED,
        error: error
    }
}
export const getBooksSuccess = (data)=>{
    return{
        type: actionTypes.GET_BOOKS_SUCCESS,
        data: data,
    };
}
export const getBooks = (searchStr) =>{
    return dispatch => {
        dispatch(getBooksStart());
        let response=booksPrototype.getBooks(searchStr)
        if(response.status){
            dispatch(getBooksSuccess(response.data))
        }else{
            dispatch(getBooksFailed(response.err))
        }
    }
}