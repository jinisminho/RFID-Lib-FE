import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import MyUtil from "store/utility"
import axios from '../../../axios'
import { responseError } from '../../utility'


//getRentingInfo
export const getRentingInfoSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIBRARIAN_GET_RENTINGINFO_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getRentingInfoFailed = (error) => {
    return {
        type: actionTypes.LIBRARIAN_GET_RENTINGINFO_FAILED,
        error: error
    }
}

export const getRentingInfoStart = () => {
    return {
        type: actionTypes.LIBRARIAN_GET_RENTINGINFO_START
    }
}

export const getRentingInfo = (page,size,studentId) => {
    return dispatch => {
        dispatch(getRentingInfoStart())
        let response=prototype.getRentingInfos(studentId)
        if(!studentId) response.status = false
        if(response.status){
            dispatch(getRentingInfoSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getRentingInfoFailed(response.err))
        }

        // let stuId = localStorage.getItem('userId')
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getBookFail(error))
        //     });
    }
}

//getExtendedHistory
export const getExtendedHistorySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIBRARIAN_GET_DUEHISTORY_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getExtendedHistoryFailed = (error) => {
    return {
        type: actionTypes.LIBRARIAN_GET_DUEHISTORY_FAILED,
        error: error
    }
}

export const getExtendedHistoryStart = () => {
    return {
        type: actionTypes.LIBRARIAN_GET_DUEHISTORY_START
    }
}

export const getExtendedHistory = (page,size,studentId, bookId) => {
    return dispatch => {
        dispatch(getExtendedHistoryStart())
        let response=prototype.getExtendedHistory()
        if(!studentId && !bookId) response.status = false
        if(response.status){
            dispatch(getExtendedHistorySuccess(response.data,response.total,page,size))
        }else{
            dispatch(getExtendedHistoryFailed(response.err))
        }

        // let stuId = localStorage.getItem('userId')
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getBookFail(error))
        //     });
    }
}

//extendDue
export const extendDueSuccess = () => {
    return {
        type: actionTypes.LIBRARIAN_EXTEND_DUE_SUCCESS
    }
}

export const extendDueFailed = (error) => {
    return {
        type: actionTypes.LIBRARIAN_EXTEND_DUE_FAILED,
        error: error
    }
}

export const extendDueStart = () => {
    return {
        type: actionTypes.LIBRARIAN_EXTEND_DUE_START
    }
}

export const extendDue = (studentId, bookId) => {
    return dispatch => {
        dispatch(extendDueStart())

        let response

        if (!studentId && !bookId) {
            response = { "err": "Error: Extend due date Failed", "status": false }
        } else {
            prototype.addDueDate(studentId, bookId).status ? response = { "status": true } :  response = { "err": "Error at extendDue", "status": false };
            // response = { "status": true };
        }

        if (response.status) {
            dispatch(extendDueSuccess(response.status))
        } else {
            dispatch(extendDueFailed(response.err))
        }

        // let stuId = localStorage.getItem('userId')
        // let url='/books'
        // if(search){
        //     url+='?page='+page+'&size='+size+"&name="+search
        // }else {
        //     url+='?page='+page+'&size='+size
        // }
        // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
        //     .then(response => {
        //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
        //     })
        //     .catch(error => {
        //         dispatch(getBookFail(error))
        //     });
    }
}

//get student
export const getStudentSuccess = (data) => {
    return {
        type: actionTypes.LIBRARIAN_INFO_GET_STUDENT_SUCCESS,
        data: data
    }
}

export const getStudentFailed = (error) => {
    return {
        type: actionTypes.LIBRARIAN_INFO_GET_STUDENT_FAILED,
        error: error
    }
}

export const getStudentStart = () => {
    return {
        type: actionTypes.LIBRARIAN_INFO_GET_STUDENT_START,
    }
}

export const getStudent = (search) => {
    return dispatch => {
        dispatch(getStudentStart())

        let url = '/patron/profile/getProfile/' + search
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getStudentSuccess(response.data))
            })
            .catch(error => {
                dispatch(getStudentFailed(responseError(error.response.data.status, error.response.data)))
            });

        // let response=prototype.getStudent(search)
        // if(response.status){
        //     dispatch(getStudentSuccess(response.data))
        // }else{
        //     dispatch(getStudentFailed(response.err))
        // }
    }

}