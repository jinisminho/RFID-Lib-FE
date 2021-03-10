import * as actionTypes from '../actionTypes'
import axios from '../../../axios'
import {responseError} from '../../utility'
import * as MyConstant from '../../../views/Util/Constant'
import MyUtil from "store/utility"
import moment from 'moment';

export const getAlarmLogIn1DateSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.ADMIN_GET_ALARM_LOG_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getAlarmLogIn1DateFailed = (error) => {
    return {
        type: actionTypes.ADMIN_GET_ALARM_LOG_FAILED,
        error: error
    }
}

export const getAlarmLogIn1DateStart = () => {
    return {
        type: actionTypes.ADMIN_GET_ALARM_LOG_START
    }
}

export const getAlarmLogIn1Date = (page,size,date) => {
    return dispatch => {
        dispatch(getAlarmLogIn1DateStart())
        let dateFormatted = date ? moment(MyUtil.convertToDate(date)).format(MyConstant.DATE_REQ) : "";
        let url='/securityGate/getAlarmLog/'+dateFormatted+'?size='+size+"&page="+page
        axios.get(url, {withCredentials: true})
            .then(response => {
                dispatch(getAlarmLogIn1DateSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error=> {
                dispatch(responseError(getAlarmLogIn1DateFailed,error))
            });
    }

}