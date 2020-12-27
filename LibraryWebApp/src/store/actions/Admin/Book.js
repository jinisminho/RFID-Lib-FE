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


export const addBookStart =()=>{
    return({
        type: actionTypes.ADD_BOOK_START
    })
} 
export const addBookFail =(error)=>{
    return({
        type: actionTypes.ADD_BOOK_FAILED,
        error:error
    })
} 
export const addBookSuccess =()=>{
    return({
        type: actionTypes.ADD_BOOK_SUCCESS,
    })
} 
export const addBook = (data) => {
    return dispatch => {
        dispatch(addBookStart())    
        let response=booksPrototype.addBooks(data)
        if(response.status==true){
            dispatch(addBookSuccess())
        }else{
            dispatch(addBookFail(response.error))
        }
        // axios.post('categories/',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(addBookSuccess())
        //     })
        //     .catch(error => {
        //         dispatch(addBookFail(error))
        //     });
        
    }
}

export const updateBookStart =()=>{
    return({
        type: actionTypes.UPDATE_BOOK_START
    })
} 
export const updateBookFail =(error)=>{
    return({
        type: actionTypes.UPDATE_BOOK_FAILED,
        error:error
    })
} 
export const updateBookSuccess =()=>{
    return({
        type: actionTypes.UPDATE_BOOK_SUCCESS,
    })
} 
export const updateBook = (data) => {
    return dispatch => {
        dispatch(updateBookStart())    
        let response=booksPrototype.updateBooks(data)
        if(response.status==true){
            dispatch(updateBookSuccess())
        }else{
            dispatch(updateBookFail(response.error))
        }
        // axios.post('categories/',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(addBookSuccess())
        //     })
        //     .catch(error => {
        //         dispatch(addBookFail(error))
        //     });
        
    }
}

export const deleteBookStart =()=>{
    return({
        type: actionTypes.DELETE_BOOK_START
    })
} 
export const deleteBookFail =(error)=>{
    return({
        type: actionTypes.DELETE_BOOK_FAILED,
        error:error
    })
} 
export const deleteBookSuccess =()=>{
    return({
        type: actionTypes.DELETE_BOOK_SUCCESS,
    })
} 
export const deleteBook = (id) => {
    return dispatch => {
        dispatch(deleteBookStart())    
        let response=booksPrototype.deleteBook(id)
        if(response.status==true){
            dispatch(deleteBookSuccess())
        }else{
            dispatch(deleteBookFail(response.error))
        }
    }
}