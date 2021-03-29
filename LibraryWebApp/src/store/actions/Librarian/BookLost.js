import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getBookLostSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_BOOK_LOST_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getBookLostFailed = (error) => {
    return {
        type: actionTypes.GET_BOOK_LOST_FAILED,
        error: error
    }
}

export const getBookLostStart = () => {
    return {
        type: actionTypes.GET_BOOK_LOST_START
    }
}

export const getBookLost = (page,size,start,end,status) => {
    return dispatch => {
        dispatch(getBookLostStart())
        let url = ""
        if(status){
            url ='/lost/find'+'?page='+page+'&size='+size+"&endDate="+end+"&startDate="+start+"&status="+status
        }else{
            url ='/lost/find'+'?page='+page+'&size='+size+"&endDate="+end+"&startDate="+start
        }
        
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getBookLostSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getBookLostFailed,error))
            });
    }

}

export const getLostBookFineSuccess = (data) => {
    return {
        type: actionTypes.GET_BOOK_LOST_FINE_SUCCESS,
        data: data,
    }
}

export const getLostBookFineFailed = (error) => {
    return {
        type: actionTypes.GET_BOOK_LOST_FINE_FAILED,
        error: error
    }
}

export const getLostBookFineStart = () => {
    return {
        type: actionTypes.GET_BOOK_LOST_FINE_START
    }
}

export const getLostBookFine = (id) => {
    return dispatch => {
        dispatch(getLostBookFineStart())
        let url='/lost/getLostBookFine/'+id
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getLostBookFineSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(getLostBookFineFailed,error))
            });
    }

}

export const confirmBookLostSuccess = (data) => {
    return {
        type: actionTypes.CONFIRM_BOOK_LOST_SUCCESS,
        data: data,
    }
}

export const confirmBookLostFailed = (error) => {
    return {
        type: actionTypes.CONFIRM_BOOK_LOST_FAILED,
        error: error
    }
}

export const confirmBookLostStart = () => {
    return {
        type: actionTypes.CONFIRM_BOOK_LOST_START
    }
}

export const confirmBookLost = (data) => {
    return dispatch => {
        dispatch(confirmBookLostStart())
        let url='/lost/confirm'
        axios.post(url,data, {withCredentials: true})
            .then(response => {
                dispatch(confirmBookLostSuccess(response.data))
            })
            .catch(error=> {
                dispatch(responseError(confirmBookLostFailed,error))
            });
    }

}

export const cancelConfirmBookLost = () => {
    return {
        type: actionTypes.CANCEL_CONFIRM_BOOK_LOST
    }
}