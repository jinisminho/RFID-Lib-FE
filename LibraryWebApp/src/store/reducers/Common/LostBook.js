import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'

//lost reports
const getLostReportsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getLostReportsSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        total: action.total,
        page: action.page + 1,
        error: null,
        loading: false,
    })
}
const getLostReportsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//add patron type
const addLostReportStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
    })
}
const addLostReportSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Lost book successfully reported, please wait for confirmation email.",
        loading: false,
    })
}
const addLostReportFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

export default function reducer(state = {
    error: null,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    successMsg: null,
    data:null,
}, action) {
    switch (action.type) {

        case actionTypes.COMMON_GET_LOST_REPORTS_PAGE_START: return getLostReportsStart(state, action)
        case actionTypes.COMMON_GET_LOST_REPORTS_PAGE_SUCCESS: return getLostReportsSuccess(state, action)
        case actionTypes.COMMON_GET_LOST_REPORTS_PAGE_FAILED: return getLostReportsFail(state, action)

        case actionTypes.COMMON_ADD_LOST_REPORT_START: return addLostReportStart(state, action)
        case actionTypes.COMMON_ADD_LOST_REPORT_SUCCESS: return addLostReportSuccess(state, action)
        case actionTypes.COMMON_ADD_LOST_REPORT_FAILED: return addLostReportFail(state, action)
        
    }
    return state
}
