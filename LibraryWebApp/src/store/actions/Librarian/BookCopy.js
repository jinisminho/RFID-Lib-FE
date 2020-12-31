import * as actionTypes from '../actionTypes'
import * as copyPrototype from '../../prototype/bookCopyMng'
import { getBookSuccess } from './Book'

export const getCopySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_COPY_BOOK_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getCopyFailed = (error) => {
    return {
        type: actionTypes.GET_COPY_BOOK_FAILED,
        error: error
    }
}

export const getCopyStart = () => {
    return {
        type: actionTypes.GET_COPY_BOOK_START
    }
}

export const getCopy = (page,size,search) => {
    return dispatch => {
        dispatch(getCopyStart())
        let response=copyPrototype.getCopy(search,page,size)
        if(response.status){
            dispatch(getCopySuccess(response.data,response.total,page,size))
        }else{
            dispatch(getCopyFailed(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getCopySuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getCopyFail(error))
        //     });
    }

}


export const addCopyStart =()=>{
    return({
        type: actionTypes.ADD_COPY_BOOK_START
    })
} 
export const addCopyFail =(error)=>{
    return({
        type: actionTypes.ADD_COPY_BOOK_FAILED,
        error:error
    })
} 
export const addCopySuccess =()=>{
    return({
        type: actionTypes.ADD_COPY_BOOK_SUCCESS,
    })
} 
export const addCopy = (data) => {
    return dispatch => {
        dispatch(addCopyStart())    
        let response=copyPrototype.addCopy(data)
        if(response.status==true){
            dispatch(addCopySuccess())
        }else{
            dispatch(addCopyFail(response.error))
        }
        // axios.post('categories/',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(addCopySuccess())
        //     })
        //     .catch(error => {
        //         dispatch(addCopyFail(error))
        //     });
        
    }
}

export const updateCopyStart =()=>{
    return({
        type: actionTypes.UPDATE_COPY_BOOK_START
    })
} 
export const updateCopyFail =(error)=>{
    return({
        type: actionTypes.UPDATE_COPY_BOOK_FAILED,
        error:error
    })
} 
export const updateCopySuccess =()=>{
    return({
        type: actionTypes.UPDATE_COPY_BOOK_SUCCESS,
    })
} 
export const updateCopy = (data) => {
    return dispatch => {
        dispatch(updateCopyStart())    
        let response=copyPrototype.updateCopy(data)
        if(response.status==true){
            dispatch(updateCopySuccess())
        }else{
            dispatch(updateCopyFail(response.error))
        }
        // axios.post('categories/',data,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(addCopySuccess())
        //     })
        //     .catch(error => {
        //         dispatch(addCopyFail(error))
        //     });
        
    }
}

export const deleteCopyStart =()=>{
    return({
        type: actionTypes.DELETE_COPY_BOOK_START
    })
} 
export const deleteCopyFail =(error)=>{
    return({
        type: actionTypes.DELETE_COPY_BOOK_FAILED,
        error:error
    })
} 
export const deleteCopySuccess =()=>{
    return({
        type: actionTypes.DELETE_COPY_BOOK_SUCCESS,
    })
} 
export const deleteCopy = (id) => {
    return dispatch => {
        dispatch(deleteCopyStart())    
        let response=copyPrototype.deleteCopy(id)
        if(response.status==true){
            dispatch(deleteCopySuccess())
        }else{
            dispatch(deleteCopyFail(response.error))
        }
    }
}

export const getAllBookSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOKS_SUCCESS,
        bookData: data
    }
}

export const getAllBookFail = (error) => {
    return {
        type: actionTypes.GET_BOOKS_FAILED,
        error: error
    }
}

export const getAllBookStart = () => {
    return {
        type: actionTypes.GET_BOOKS_START
    }
}
export const getAllBook = () => {
    return dispatch => {
        dispatch(getAllBookStart())
        let response=copyPrototype.getBooks()
        if(response.status){
            dispatch(getAllBookSuccess(response.data))
        }else{
            dispatch(getAllBookFail(response.err))
        }
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getCopySuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getCopyFail(error))
        //     });
    }

}
