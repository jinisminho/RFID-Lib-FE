import * as actionTypes from '../actionTypes'
import * as copyPrototype from '../../prototype/bookCopyMng'

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

export const getCopy = (page,size,search,select) => {
    return dispatch => {
        dispatch(getCopyStart())
        let response=copyPrototype.getCopy(search,page,size,select)
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

export const getBookCopyStatusSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_SUCCESS,
        data: data,
    }
}

export const getBookCopyStatusFailed = (error) => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_FAILED,
        error: error
    }
}

export const getBookCopyStatusStart = () => {
    return {
        type: actionTypes.GET_BOOK_COPY_STATUS_START
    }
}

export const getBookCopyStatus = () => {
    return dispatch => {
        dispatch(getBookCopyStatusStart())
        let response=copyPrototype.getBookCopyStatus()
        if(response.status){
            dispatch(getBookCopyStatusSuccess(response.data))
        }else{
            dispatch(getBookCopyStatusFailed(response.err))
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

export const getCopyTypeSuccess = (data) => {
    return {
        type: actionTypes.GET_COPY_TYPE_SUCCESS,
        data: data,
    }
}

export const getCopyTypeFailed = (error) => {
    return {
        type: actionTypes.GET_COPY_TYPE_FAILED,
        error: error
    }
}

export const getCopyTypeStart = () => {
    return {
        type: actionTypes.GET_COPY_TYPE_START
    }
}

export const getCopyType = () => {
    return dispatch => {
        dispatch(getCopyTypeStart())
        let response=copyPrototype.getCopyTypes()
        if(response.status){
            dispatch(getCopyTypeSuccess(response.data))
        }else{
            dispatch(getCopyTypeFailed(response.err))
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
        type: actionTypes.ADD_COPY_BOOK_SUCCESS
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

export const generateBarcodeStart =()=>{
    return({
        type: actionTypes.GENERATE_BARCODE_START
    })
} 
export const generateBarcodeFailed =(error)=>{
    return({
        type: actionTypes.GENERATE_BARCODE_FAILED,
        error:error
    })
} 
export const generateBarcodeSuccess =(data)=>{
    return({
        type: actionTypes.GENERATE_BARCODE_SUCCESS,
        data:data
    })
} 
export const generateBarcode = (data) => {
    return dispatch => {
        dispatch(generateBarcodeStart())    
        let response=copyPrototype.generateBarcode(data)
        if(response.status==true){
            dispatch(generateBarcodeSuccess(response.data))
        }else{
            dispatch(generateBarcodeFailed(response.error))
        }
    }
}
