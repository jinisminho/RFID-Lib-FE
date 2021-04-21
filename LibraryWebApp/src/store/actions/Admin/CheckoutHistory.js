import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
export const getHistorySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.GET_HISTORY_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getHistoryFailed = (error) => {
    return {
        type: actionTypes.GET_HISTORY_FAILED,
        error: error
    }
}

export const getHistoryStart = () => {
    return {
        type: actionTypes.GET_HISTORY_START
    }
}

export const getHistory = (page,size,from,to) => {
    return dispatch => {
        dispatch(getHistoryStart())
        let url='/borrowing/get'+'?page='+page+'&size='+size+"&from="+from+"&to="+to
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getHistorySuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getHistoryFailed,error))
            });
    }

}