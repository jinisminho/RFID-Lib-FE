import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import { responseError } from '../../utility'

//Get lost reports
export const getLostReportsSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.COMMON_GET_LOST_REPORTS_PAGE_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getLostReportsFailed = (error) => {
    return {
        type: actionTypes.COMMON_GET_LOST_REPORTS_PAGE_FAILED,
        error: error
    }
}

export const getLostReportsStart = () => {
    return {
        type: actionTypes.COMMON_GET_LOST_REPORTS_PAGE_START
    }
}

export const getLostReports = (page, size, patronId, startDate, endDate) => {
    return dispatch => {
        dispatch(getLostReportsStart())

        let url = '/lost/find/' + patronId + '?page=' + page + '&size=' + size + (startDate ? '&startDate=' + startDate : '') + (endDate ? '&endDate=' + endDate : '')
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getLostReportsSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getLostReportsFailed,error))
            });
    }

}

//Add lost report

export const addLostReportStart = () => {
    return ({
        type: actionTypes.COMMON_ADD_LOST_REPORT_START
    })
}
export const addLostReportFail = (error) => {
    return ({
        type: actionTypes.COMMON_ADD_LOST_REPORT_FAILED,
        error: error
    })
}
export const addLostReportSuccess = () => {
    return ({
        type: actionTypes.COMMON_ADD_LOST_REPORT_SUCCESS,
    })
}

export const addLostReport = (bookBorrowingId) => {
    return dispatch => {
        dispatch(addLostReportStart())

        let url = '/lost/reportByPatron/'+bookBorrowingId
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(addLostReportSuccess())
            })
            .catch(error => {
                dispatch(responseError(addLostReportFail,error))
            });
    }
}