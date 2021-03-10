import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'

//get alarm log in 1 date
const getAlarmLogIn1DateStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getAlarmLogIn1DateSuccess = (state, action) => {
    return updateObject(state, {
        log: action.data,
        logTotal: action.total,
        logPage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getAlarmLogIn1DateFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

export default function reducer(state = {
    error: null,
    loading: false,
    logTotal: 0,
    logPage: 1,
    sizePerPage: 10,
    successMsg: null,
    log:null,
}, action) {
    switch (action.type) {

        case actionTypes.ADMIN_GET_ALARM_LOG_START: return getAlarmLogIn1DateStart(state, action)
        case actionTypes.ADMIN_GET_ALARM_LOG_SUCCESS: return getAlarmLogIn1DateSuccess(state, action)
        case actionTypes.ADMIN_GET_ALARM_LOG_FAILED: return getAlarmLogIn1DateFail(state, action)
        
    }
    return state
}
