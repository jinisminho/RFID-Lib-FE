import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'

//getBorrowingInfo
export const getBorrowingInfoSuccess = (data, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_SUCCESS,
        totalOverdue: data.totalOverdue,
        totalBorrowing: data.totalBorrowing,
        totalReturned: data.totalReturned,
        dataOverdue: data.dataOverdue,
        dataBorrowing: data.dataBorrowing,
        dataReturned: data.dataReturned,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_FAILED,
        error: error
    }
}

export const getBorrowingInfoStart = () => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_START
    }
}

export const getBorrowingInfo = (page, size, search) => {
    return dispatch => {
        dispatch(getBorrowingInfoStart())
        let response = prototype.getRentingInfosSplit(search)
        if (response.status) {
            dispatch(getBorrowingInfoSuccess(response.data, page, size))
        } else {
            dispatch(getBorrowingInfoFailed(response.err))
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

//getBorrowingInfoOverdue
export const getBorrowingInfoOverdueSuccess = (data, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_SUCCESS,
        total: data.totalOverdue,
        data: data.dataOverdue,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoOverdueFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_FAILED,
        error: error
    }
}

export const getBorrowingInfoOverdueStart = () => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_START
    }
}

export const getBorrowingInfo_Overdue = (page, size, search) => {
    return dispatch => {
        dispatch(getBorrowingInfoOverdueStart())
        let response = prototype.getRentingInfosSplit(search)
        if (response.status) {
            dispatch(getBorrowingInfoOverdueSuccess(response.data, page, size))
        } else {
            dispatch(getBorrowingInfoOverdueFailed(response.err))
        }
    }
}

//getBorrowingInfoBorrowing
export const getBorrowingInfoBorrowingSuccess = (data, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_SUCCESS,
        total: data.totalBorrowing,
        data: data.dataBorrowing,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoBorrowingFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_FAILED,
        error: error
    }
}

export const getBorrowingInfoBorrowingStart = () => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_START
    }
}

export const getBorrowingInfo_Borrowing = (page, size, search) => {
    return dispatch => {
        dispatch(getBorrowingInfoBorrowingStart())
        let response = prototype.getRentingInfosSplit(search)
        if (response.status) {
            dispatch(getBorrowingInfoBorrowingSuccess(response.data, page, size))
        } else {
            dispatch(getBorrowingInfoBorrowingFailed(response.err))
        }
    }
}

//getBorrowingInfoReturned
export const getBorrowingInfoReturnedSuccess = (data, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_SUCCESS,
        total: data.totalReturned,
        data: data.dataReturned,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoReturnedFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_FAILED,
        error: error
    }
}

export const getBorrowingInfoReturnedStart = () => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_START
    }
}

export const getBorrowingInfo_Returned = (page, size, search) => {
    return dispatch => {
        dispatch(getBorrowingInfoReturnedStart())
        let response = prototype.getRentingInfosSplit(search)
        if (response.status) {
            dispatch(getBorrowingInfoReturnedSuccess(response.data, page, size))
        } else {
            dispatch(getBorrowingInfoReturnedFailed(response.err))
        }
    }
}

//getExtendedHistory
export const getExtendedHistorySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_DUEHISTORY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getExtendedHistoryFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_DUEHISTORY_FAILED,
        error: error
    }
}

export const getExtendedHistoryStart = () => {
    return {
        type: actionTypes.PATRON_GET_DUEHISTORY_START
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
        type: actionTypes.PATRON_EXTEND_DUE_SUCCESS
    }
}

export const extendDueFailed = (error) => {
    return {
        type: actionTypes.PATRON_EXTEND_DUE_FAILED,
        error: error
    }
}

export const extendDueStart = () => {
    return {
        type: actionTypes.PATRON_EXTEND_DUE_START
    }
}

export const extendDue = (studentId, bookId) => {
    return dispatch => {

        dispatch(extendDueStart())

        let response

        if (!studentId && !bookId) {
            response = { "err": "Error at extendDue", "status": false }
        } else {
            prototype.addDueDate(studentId, bookId).status ? response = { "status": true } : response = { "err": "Error at extendDue", "status": false };
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
        type: actionTypes.PATRON_GET_PROFILE_SUCCESS,
        data: data
    }
}

export const getStudentProfileFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_PROFILE_FAILED,
        error: error
    }
}

export const getStudentProfileStart = () => {
    return {
        type: actionTypes.PATRON_GET_PROFILE_START
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
        type: actionTypes.PATRON_UPDATE_PROFILE_SUCCESS,
        data: data
    }
}

export const updateStudentProfileFailed = (error) => {
    return {
        type: actionTypes.PATRON_UPDATE_PROFILE_FAILED,
        error: error
    }
}

export const updateStudentProfileStart = () => {
    return {
        type: actionTypes.PATRON_UPDATE_PROFILE_START
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
        type: actionTypes.PATRON_GET_WISHLIST_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getWishlistFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_WISHLIST_FAILED,
        error: error
    }
}

export const getWishlistStart = () => {
    return {
        type: actionTypes.PATRON_GET_WISHLIST_START
    }
}

export const getWishlist = (search, page, size) => {
    return dispatch => {
        dispatch(getWishlistStart())
        let response = prototype.getWishlist(page, size)
        if (response.status) {
            dispatch(getWishlistSuccess(response.data, response.total, page, size))
        } else {
            dispatch(getWishlistFailed(response.err))
        }
    }

}

//add reminder
export const addReminderSuccess = (status, msg) => {
    return {
        type: actionTypes.PATRON_ADD_REMINDER_SUCCESS,
        status: status,
        msg: msg
    }
}

export const addReminderFailed = (error) => {
    return {
        type: actionTypes.PATRON_ADD_REMINDER_FAILED,
        error: error
    }
}

export const addReminderStart = () => {
    return {
        type: actionTypes.PATRON_ADD_REMINDER_START
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