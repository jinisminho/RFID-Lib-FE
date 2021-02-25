import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import axios from '../../../axios'
import { responseError } from '../../utility'

//getBorrowingInfoOverdue
export const getBorrowingInfoOverdueSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_SUCCESS,
        total: total,
        data: data,
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
        if (search) {
            let url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + search + '?page=' + page + '&size=' + size + "&status=OVERDUED&sort=dueAt%2Casc"
            axios.get(url, { withCredentials: true })
                .then(response => {
                    dispatch(getBorrowingInfoOverdueSuccess(response.data.content, response.data.totalElements, page, size))
                })
                .catch(error => {
                    dispatch(getBorrowingInfoOverdueFailed(responseError(error)))
                });
        }

        // let response = prototype.getRentingInfosSplit(search)
        // if (response.status) {
        //     dispatch(getBorrowingInfoOverdueSuccess(response.data, page, size))
        // } else {
        //     dispatch(getBorrowingInfoOverdueFailed(response.err))
        // }
    }
}

//getBorrowingInfoBorrowing
export const getBorrowingInfoBorrowingSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_SUCCESS,
        total: total,
        data: data,
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
        if (search) {
            let url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + search + '?page=' + page + '&size=' + size + "&status=BORROWING&sort=borrowing.borrowedAt%2Cdesc"
            axios.get(url, { withCredentials: true })
                .then(response => {
                    dispatch(getBorrowingInfoBorrowingSuccess(response.data.content, response.data.totalElements, page, size))
                })
                .catch(error => {
                    dispatch(getBorrowingInfoBorrowingFailed(responseError(error)))
                });
        }

        // let response = prototype.getRentingInfosSplit(search)
        // if (response.status) {
        //     dispatch(getBorrowingInfoBorrowingSuccess(response.data, page, size))
        // } else {
        //     dispatch(getBorrowingInfoBorrowingFailed(response.err))
        // }
    }
}

//getBorrowingInfoReturned
export const getBorrowingInfoReturnedSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_SUCCESS,
        total: total,
        data: data,
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
        if (search) {
            let url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + search + '?page=' + page + '&size=' + size + "&status=RETURNED&sort=returnedAt%2Cdesc"
            axios.get(url, { withCredentials: true })
                .then(response => {
                    dispatch(getBorrowingInfoReturnedSuccess(response.data.content, response.data.totalElements, page, size))
                })
                .catch(error => {
                    dispatch(getBorrowingInfoReturnedFailed(responseError(error)))
                });
        }

        // let response = prototype.getRentingInfosSplit(search)
        // if (response.status) {
        //     dispatch(getBorrowingInfoReturnedSuccess(response.data, page, size))
        // } else {
        //     dispatch(getBorrowingInfoReturnedFailed(response.err))
        // }
    }
}

//getExtendedHistory
export const getExtendedHistorySuccess = (data, total) => {
    return {
        type: actionTypes.PATRON_GET_DUEHISTORY_SUCCESS,
        total: total,
        data: data,
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

export const getExtendedHistory = (bookBorrowingId) => {
    return dispatch => {
        dispatch(getExtendedHistoryStart())
        let url = '/patron/extendHistory/getExtendHistories/' + bookBorrowingId + '?page=' + 0 + '&size=' + 100
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getExtendedHistorySuccess(response.data.content, response.data.totalElements))
            })
            .catch(error => {
                dispatch(getExtendedHistoryFailed(responseError(error)))
            });

        // let response = prototype.getExtendedHistory()
        // if (!patronId && !bookId) response.status = false
        // if (response.status) {
        //     dispatch(getExtendedHistorySuccess(response.data, response.total))
        // } else {
        //     dispatch(getExtendedHistoryFailed(response.err))
        // }

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

export const extendDue = (bookBorrowingId, librarianId, form) => {
    return dispatch => {

        dispatch(extendDueStart())

        let reason = form ? (form.reason ? form.reason : null) : null

        let url = '/renew/createExtendHistory/' + bookBorrowingId + (librarianId ? "?librarianId=" + librarianId : "")
        axios.post(url, reason, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                dispatch(extendDueSuccess())
            })
            .catch(error => {
                dispatch(extendDueSuccess(responseError(error)))
            });

        // let response

        // if (!patronId && !bookId) {
        //     response = { "err": "Error at extendDue", "status": false }
        // } else {
        //     prototype.addDueDate(patronId, bookId).status ? response = { "status": true } : response = { "err": "Error at extendDue", "status": false };
        // }

        // if (response.status) {
        //     dispatch(extendDueSuccess(response.status))
        // } else {
        //     dispatch(extendDueFailed(response.err))
        // }
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

export const getStudentProfile = (patronId) => {
    return dispatch => {
        dispatch(getStudentProfileStart())

        let url = 'http://localhost:8091/patron/profile/getProfile/' + patronId
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getStudentProfileSuccess(response.data))
            })
            .catch(error => {
                dispatch(getStudentProfileFailed(responseError(error)))
            });


        // let response = prototype.getStudentProfile(patronId);
        // if (!patronId) {
        //     response = { "err": "Error at getStudentProfile", "status": false }
        // }

        // if (response.status) {
        //     dispatch(getStudentProfileSuccess(response.data))
        // } else {
        //     dispatch(getStudentProfileFailed(response.err))
        // }
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

export const updateStudentProfile = (patronId, form) => {
    return dispatch => {
        dispatch(updateStudentProfileStart())

        form.id = patronId

        let url = '/patron/profile/updateProfile/' + patronId
        axios.post(url, form, { withCredentials: true })
            .then(response => {
                dispatch(updateStudentProfileSuccess(true))
            })
            .catch(error => {
                dispatch(updateStudentProfileFailed(responseError(error)))
            });

        // let response = prototype.updateStudentProfile(form);

        // if (!patronId) {
        //     response = { "err": "Error at updateStudentProfile", "status": false }
        // }

        // if (response.status) {
        //     dispatch(updateStudentProfileSuccess(response.status))
        // } else {
        //     dispatch(updateStudentProfileFailed(response.err))
        // }
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
        let url = '/wishlist/getWishlist' + '?page=' + page + '&size=' + size + "&patronID=" + search
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getWishlistSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(getWishlistFailed(responseError(error)))
            });
        // if (response.status) {
        //     dispatch(getWishlistSuccess(response.data, response.total, page, size))
        // } else {
        //     dispatch(getWishlistFailed(response.err))
        // }
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

export const addReminder = (bookId, patronId) => {
    return dispatch => {
        dispatch(addReminderStart())

        let url = '/wishlist/addWishlist' + '?bookID=' + bookId + "&patronID=" + patronId

        if (!bookId || !patronId) {
            dispatch(addReminderFailed("Error at [addReminder]"))
        } else {
            // prototype.addWishlist(bookId).status ? response = { "msg": "Added reminder successfully", "status": true } : response = { "err": "Added reminder successfully", "status": false }
            axios.post(url, {}, { withCredentials: true })
                .then(response => {
                    dispatch(addReminderSuccess(true, "Added to wishlist successfully"))
                })
                .catch(error => {
                    dispatch(addReminderFailed(responseError(error)))
                });
        }


    }

}

//check policy before renew 
export const checkPolicySuccess = (data) => {
    return {
        type: actionTypes.PATRON_CHECK_POLICY_RENEW_SUCCESS,
        isRenewable: data.ableToRenew,
        policyViolation: data.reasons,
        newDueDate: data.newDueDate,
        isViolated: data.violatePolicy
    }
}

export const checkPolicyFailed = (error) => {
    return {
        type: actionTypes.PATRON_CHECK_POLICY_RENEW_FAILED,
        error: error
    }
}

export const checkPolicyStart = () => {
    return {
        type: actionTypes.PATRON_CHECK_POLICY_RENEW_START
    }
}

export const checkPolicy = (bookBorrowingId) => {
    return dispatch => {
        dispatch(checkPolicyStart())

        let url = '/renew/validate/' + bookBorrowingId

        if (!bookBorrowingId) {
            dispatch(checkPolicyFailed(responseError(false, "Error at checkPolicy")))
        } else {
            axios.get(url, { withCredentials: true })
                .then(response => {
                    dispatch(checkPolicySuccess(response.data))
                })
                .catch(error => {
                    dispatch(checkPolicyFailed(responseError(error)))
                });
        }

        // let response

        // if (!bookCopyId || !patronId) {
        //     response = { "err": "Error at checkPolicy", "status": false }
        // } else {
        //     bookCopyId = 6
        //     // prototype.checkPolicy(bookCopyId).status ? response = { "newDueDate": "December 20, 2020 15:15:30","policyViolation": ["Reason1","Reason2"], "status": true } : response = { "err": "Check policy successfully", "status": false }
        //     // prototype.checkPolicy(bookCopyId).status ? response = {"policyViolation": ["Reason1","Reason2"], "status": true } : response = { "err": "Check policy successfully", "status": false }
        //     prototype.checkPolicy(bookCopyId).status ? response = { "newDueDate": "December 20, 2020 15:15:30", "status": true } : response = { "err": "Check policy successfully", "status": false }
        // }

        // if (response.status) {
        //     dispatch(checkPolicySuccess(response.status, response))
        // } else {
        //     dispatch(checkPolicyFailed(response.err))
        // }

    }

}