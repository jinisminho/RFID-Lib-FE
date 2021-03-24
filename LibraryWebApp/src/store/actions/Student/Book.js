import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
import * as MyConstant from 'views/Util/Constant'


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
        let url='/book/search'+'?page='+page+'&size='+size+"&searchValue="+search+"&status="+MyConstant.BOOK_IN_CIRCULATION+","+MyConstant.BOOK_LIB_USE_ONLY
        // let url='/book/all'
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getBookFailed,error))
            });
    }

}

//get location
export const getLocationSuccess = (data) => {
    return {
        type: actionTypes.PAT_GET_BOOK_LOCATIONS_SUCCESS,
        data: data,
    }
}

export const getLocationFailed = (error) => {
    return {
        type: actionTypes.PAT_GET_BOOK_LOCATIONS_FAILED,
        error: error
    }
}

export const getLocationStart = () => {
    return {
        type: actionTypes.PAT_GET_BOOK_LOCATIONS_START
    }
}

export const getLocation = (search) => {
    return dispatch => {
        search=search?search:""
        dispatch(getLocationStart())
        let url='/position/book?bookId='+search
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getLocationSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getLocationFailed,error))
            });
    }

}

//Get added book search list
export const addBookSearchListStart =()=>{
    return({
        type: actionTypes.PAT_ADD_BOOK_SEARCH_LIST_START
    })
} 
export const addBookSearchListFail =(error)=>{
    return({
        type: actionTypes.PAT_ADD_BOOK_SEARCH_LIST_FAILED,
        error:error
    })
} 
export const addBookSearchListSuccess =()=>{
    return({
        type: actionTypes.PAT_ADD_BOOK_SEARCH_LIST_SUCCESS,
    })
} 

export const addBookSearchList = (data) => {
    return dispatch => {
        dispatch(addBookSearchListStart()) 
        let url='/portableSearch/add'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addBookSearchListSuccess())
            })
            .catch(error=> {
                dispatch(responseError(addBookSearchListFail,error))
            });   
        
    }
}