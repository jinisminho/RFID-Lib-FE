import * as actionTypes from '../actionTypes'
import * as booksPrototype from '../../prototype/bookMng'

export const getBookSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getBookFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_FAILED,
        error: error
    }
}

export const getBookStart = () => {
    return {
        type: actionTypes.ADMIN_GET_BOOKS_START
    }
}

export const getBook = (page,size,search) => {
    return dispatch => {
        dispatch(getBookStart())
        let response=booksPrototype.getBooks(search,page,size)
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