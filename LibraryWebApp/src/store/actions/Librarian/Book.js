import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
import {logout} from '../auth'
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
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getBookFailed,error))
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
        axios.get(url, {withCredentials: true})
            .then(response => {
                response.data.forEach(element => {
                    element["value"]=element["id"]
                    element["label"]=element["name"]+"-"+element["birthYear"]+"-"+element["country"]
                    delete element["id"]
                    delete element["name"]
                });
                
                dispatch(getAuthorSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getAuthorFailed,error))
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
        axios.get(url, {withCredentials: true})
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
                dispatch(responseError(getGenreFailed,error))
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
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addBookSuccess())
            })
            .catch(error=> {
                dispatch(responseError(addBookFail,error))
            });   
        
    }
}

export const addCopyStart =()=>{
    return({
        type: actionTypes.ADD_BOOK_COPY_START
    })
} 
export const addCopyFail =(error)=>{
    return({
        type: actionTypes.ADD_BOOK_COPY_FAILED,
        error:error
    })
} 
export const addCopySuccess =()=>{
    return({
        type: actionTypes.ADD_BOOK_COPY_SUCCESS,
    })
} 
export const addBookCopy = (data) => {
    return dispatch => {
        dispatch(addCopyStart())    
        let url='/copy/add'
        axios.post(url,data, { withCredentials: true })
            .then(response => {
                dispatch(addCopySuccess())
            })
            .catch(error=> {
                dispatch(responseError(addCopyFail,error))
            });  
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
        axios.post(url,data, {withCredentials: true})
            .then(response => {
                dispatch(updateBookSuccess())
            })
            .catch(error=> {
                dispatch(responseError(updateBookFail,error))
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
                dispatch(responseError(deleteBookFail,error))
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
        let url='/librarian/barcodes/generate'
        axios.get(url,{withCredentials: true,params: {
            ...data
          }})
            .then(response => {
                dispatch(generateCopyBarcodeSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(generateCopyBarcodeFailed,error))
            });   
    }
}

export const getBookCopyTypeSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOK_COPY_TYPE_SUCCESS,
        data: data,
    }
}

export const getBookCopyTypeFailed = (error) => {
    return {
        type: actionTypes.GET_BOOK_COPY_TYPE_FAILED,
        error: error
    }
}

export const getBookCopyTypeStart = () => {
    return {
        type: actionTypes.GET_BOOK_COPY_TYPE_START
    }
}

export const getBookCopyType = () => {
    return dispatch => {
        dispatch(getBookCopyTypeStart())
        let url = '/copyType/all'
        axios.get(url, { withCredentials: true })
            .then(response => {
                response.data.forEach(element => {
                    element["value"] = element["id"]
                    element["label"] = element["name"]
                    delete element["id"]
                    delete element["name"]
                });
                dispatch(getBookCopyTypeSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getBookCopyTypeFailed,error))
            });
    }

}

export const getLocationSuccess = (data) => {
    return {
        type: actionTypes.LIB_GET_BOOK_LOCATIONS_SUCCESS,
        data: data,
    }
}

export const getLocationFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BOOK_LOCATIONS_FAILED,
        error: error
    }
}

export const getLocationStart = () => {
    return {
        type: actionTypes.LIB_GET_BOOK_LOCATIONS_START
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