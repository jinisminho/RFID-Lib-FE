import * as actionTypes from '../actionTypes'
import * as booksPrototype from '../../prototype/bookMng'
import * as copyBooksPrototype from '../../prototype/bookCopyMng'
import axios from '../../../axios'
import * as message from '../../constant'
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
        search=search?search:""
        dispatch(getBookStart())
        let url='/book/search'+'?page='+page+'&size='+size+"&searchValue="+search
        // let url='/book/all'
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                console.log(error)
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(getBookFailed(msg))
            });
    }

}

export const getAuthorSuccess = (data) => {
    return {
        type: actionTypes.GET_AUTHOR_SUCCESS,
        data: data,
    }
}

export const getAuthorFailed = (error) => {
    return {
        type: actionTypes.GET_AUTHOR_FAILED,
        error: error
    }
}

export const getAuthorStart = () => {
    return {
        type: actionTypes.GET_AUTHOR_START
    }
}

export const getAuthor = () => {
    return dispatch => {
        dispatch(getAuthorStart())
        let url='/author/all'
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                response.data.forEach(element => {
                    element["value"]=element["id"]
                    element["label"]=element["name"]
                    delete element["id"]
                    delete element["name"]
                });
                
                dispatch(getAuthorSuccess(response.data))
            })
            .catch(error=> {
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(getBookFailed(msg))
            });
    }

}
export const getGenreSuccess = (data) => {
    return {
        type: actionTypes.GET_GENRE_SUCCESS,
        data: data,
    }
}

export const getGenreFailed = (error) => {
    return {
        type: actionTypes.GET_GENRE_FAILED,
        error: error
    }
}

export const getGenreStart = () => {
    return {
        type: actionTypes.GET_GENRE_START
    }
}

export const getGenre = () => {
    return dispatch => {
        dispatch(getGenreStart())
        let url='/genre/all'
        axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                response.data.forEach(element => {
                    element["value"]=element["id"]
                    element["label"]=element["name"]
                    delete element["id"]
                    delete element["name"]
                });
                
                dispatch(getGenreSuccess(response.data))
            })
            .catch(error=> {
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(getGenreFailed(msg))
            });
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
        let url='/book/add'
        axios.post(url,data, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(addBookSuccess())
            })
            .catch(error=> {
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(addBookFail(msg))
            });   
        
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
export const addBookCopy = (data) => {
    return dispatch => {
        dispatch(addCopyStart())    
        let response=copyBooksPrototype.addCopy(data)
        if(response.status==true){
            dispatch(addCopySuccess())
        }else{
            dispatch(addCopyFail(response.error))
        }
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
        let url='/book/update'
        axios.post(url,data, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(updateBookSuccess())
            })
            .catch(error=> {
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(updateBookFail(msg))
            });   
        
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
        let url='/book/delete'
        axios.post(url,id, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
            .then(response => {
                dispatch(deleteBookSuccess())
            })
            .catch(error=> {
                let msg=""
                if(error.response.data.status==500){
                    msg=message.INTERNAL_SERVER_ERROR
                }else{
                    msg=error.response.data.message
                }
                dispatch(deleteBookFail(msg))
            });   
        
    }
}

export const generateCopyBarcodeStart =()=>{
    return({
        type: actionTypes.GENERATE_COPY_BARCODE_START
    })
} 
export const generateCopyBarcodeFailed =(error)=>{
    return({
        type: actionTypes.GENERATE_COPY_BARCODE_FAILED,
        error:error
    })
} 
export const generateCopyBarcodeSuccess =(data)=>{
    return({
        type: actionTypes.GENERATE_COPY_BARCODE_SUCCESS,
        data:data
    })
} 
export const generateCopyBarcode = (data) => {
    return dispatch => {
        dispatch(generateCopyBarcodeStart())    
        let response=copyBooksPrototype.generateBarcode(data)
        if(response.status==true){
            dispatch(generateCopyBarcodeSuccess(response.data))
        }else{
            dispatch(generateCopyBarcodeFailed(response.error))
        }
    }
}
