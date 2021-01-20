import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'

//getRentingInfo
export const getRentingInfoSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.STUDENT_GET_RENTINGINFO_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getRentingInfoFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_RENTINGINFO_FAILED,
        error: error
    }
}

export const getRentingInfoStart = () => {
    return {
        type: actionTypes.STUDENT_GET_RENTINGINFO_START
    }
}

export const getRentingInfo = (page, size, search) => {
    return dispatch => {
        dispatch(getRentingInfoStart())
        let response = prototype.getRentingInfos(search)
        if (response.status) {
            dispatch(getRentingInfoSuccess(response.data, response.total, page, size))
        } else {
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
        type: actionTypes.STUDENT_GET_DUEHISTORY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getExtendedHistoryFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_DUEHISTORY_FAILED,
        error: error
    }
}

export const getExtendedHistoryStart = () => {
    return {
        type: actionTypes.STUDENT_GET_DUEHISTORY_START
    }
}

export const getExtendedHistory = (page, size, studentId, bookId) => {
    return dispatch => {
        dispatch(getExtendedHistoryStart())
        let response = prototype.getExtendedHistory()
        if (!studentId && !bookId) response.status = false
        if (response.status) {
            dispatch(getExtendedHistorySuccess(response.data, response.total, page, size))
        } else {
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
        type: actionTypes.STUDENT_EXTEND_DUE_SUCCESS
    }
}

export const extendDueFailed = (error) => {
    return {
        type: actionTypes.STUDENT_EXTEND_DUE_FAILED,
        error: error
    }
}

export const extendDueStart = () => {
    return {
        type: actionTypes.STUDENT_EXTEND_DUE_START
    }
}

export const extendDue = (studentId, bookId) => {
    return dispatch => {

        dispatch(extendDueStart())

        let response

        if (!studentId && !bookId) {
            response = { "err": "Error at extendDue", "status": false }
        } else {
            prototype.addDueDate(studentId, bookId).status ? response = { "status": true } :  response = { "err": "Error at extendDue", "status": false };
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



//get profile
export const getStudentProfileSuccess = (data) => {
    return {
        type: actionTypes.STUDENT_GET_PROFILE_SUCCESS,
        data: data
    }
}

export const getStudentProfileFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_PROFILE_FAILED,
        error: error
    }
}

export const getStudentProfileStart = () => {
    return {
        type: actionTypes.STUDENT_GET_PROFILE_START
    }
}

export const getStudentProfile = (studentId) => {
    return dispatch => {
        dispatch(getStudentProfileStart())
        let response = prototype.getStudentProfile(studentId);
        if (!studentId) {
            response = { "err": "Error at getStudentProfile", "status": false }
        }

        if (response.status) {
            dispatch(getStudentProfileSuccess(response.data))
        } else {
            dispatch(getStudentProfileFailed(response.err))
        }
    }

}

//update profile
export const updateStudentProfileSuccess = (data) => {
    return {
        type: actionTypes.STUDENT_UPDATE_PROFILE_SUCCESS,
        data: data
    }
}

export const updateStudentProfileFailed = (error) => {
    return {
        type: actionTypes.STUDENT_UPDATE_PROFILE_FAILED,
        error: error
    }
}

export const updateStudentProfileStart = () => {
    return {
        type: actionTypes.STUDENT_UPDATE_PROFILE_START
    }
}

export const updateStudentProfile = (studentId, form) => {
    return dispatch => {
        dispatch(updateStudentProfileStart())
        
        form.id = studentId

        let response = prototype.updateStudentProfile(form);

        if (!studentId) {
            response = { "err": "Error at updateStudentProfile", "status": false }
        }

        if (response.status) {
            dispatch(updateStudentProfileSuccess(response.status))
        } else {
            dispatch(updateStudentProfileFailed(response.err))
        }
    }

}

//get Wishlist
export const getWishlistSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.STUDENT_GET_WISHLIST_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
    }
}

export const getWishlistFailed = (error) => {
    return {
        type: actionTypes.STUDENT_GET_WISHLIST_FAILED,
        error: error
    }
}

export const getWishlistStart = () => {
    return {
        type: actionTypes.STUDENT_GET_WISHLIST_START
    }
}

export const getWishlist = (search,page,size) => {
    return dispatch => {
        dispatch(getWishlistStart())
        let response=prototype.getWishlist(page,size)
        if(response.status){
            dispatch(getWishlistSuccess(response.data,response.total,page,size))
        }else{
            dispatch(getWishlistFailed(response.err))
        }
    }

}

//add reminder
export const addReminderSuccess = (status, msg) => {
    return {
        type: actionTypes.STUDENT_ADD_REMINDER_SUCCESS,
        status: status,
        msg: msg
    }
}

export const addReminderFailed = (error) => {
    return {
        type: actionTypes.STUDENT_ADD_REMINDER_FAILED,
        error: error
    }
}

export const addReminderStart = () => {
    return {
        type: actionTypes.STUDENT_ADD_REMINDER_START
    }
}

export const addReminder = (bookId, studentId) => {
    return dispatch => {
        dispatch(addReminderStart())
        let response

        if (!bookId || !studentId) {
            response = { "err": "Error at addReminder", "status": false }
        } else {
            prototype.addWishlist(bookId).status ? response = { "msg": "Added reminder successfully", "status": true } : response = { "err": "Added reminder successfully", "status": false }
        }

        if (response.status) {
            dispatch(addReminderSuccess(response.status, response.msg))
        } else {
            dispatch(addReminderFailed(response.err))
        }
    }

}