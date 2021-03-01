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

export const getBookLost = (page,size,start,end) => {
    return dispatch => {
        dispatch(getBookLostStart())
        let url='/lost/find'+'?page='+page+'&size='+size+"&endDate="+end+"&startDate="+start
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getBookLostSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(getBookLostFailed(responseError(error)))
            });
    }

}