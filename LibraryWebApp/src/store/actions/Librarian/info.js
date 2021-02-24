import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import MyUtil from "store/utility"
import axios from '../../../axios'
import { responseError } from '../../utility'

//getBorrowingInfoOverdue
export const getBorrowingInfoOverdueSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoOverdueFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_FAILED,
        error: error
    }
}

export const getBorrowingInfoOverdueStart = () => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_START
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
        type: actionTypes.LIB_GET_BORROWINGINFO_BORROWING_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoBorrowingFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_BORROWING_FAILED,
        error: error
    }
}

export const getBorrowingInfoBorrowingStart = () => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_BORROWING_START
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
        type: actionTypes.LIB_GET_BORROWINGINFO_RETURNED_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowingInfoReturnedFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_RETURNED_FAILED,
        error: error
    }
}

export const getBorrowingInfoReturnedStart = () => {
    return {
        type: actionTypes.LIB_GET_BORROWINGINFO_RETURNED_START
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
        type: actionTypes.LIBRARIAN_GET_DUEHISTORY_SUCCESS,
        total: total,
        data: data,
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
                dispatch(extendDueFailed(responseError(error)))
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

        let url = '/patron/profile/findProfile/?searchValue=' + search
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getStudentSuccess(response.data))
            })
            .catch(error => {
                dispatch(getStudentFailed(responseError(error)))
            });

        // let response=prototype.getStudent(search)
        // if(response.status){
        //     dispatch(getStudentSuccess(response.data))
        // }else{
        //     dispatch(getStudentFailed(response.err))
        // }
    }

}

//Get Student Then Get Borrowing Histories
export const getStudentThenGetBorrowingHistories = (page, size, search) => {
    return dispatch => {
        dispatch(getStudentStart())
        dispatch(getBorrowingInfoOverdueStart())
        dispatch(getBorrowingInfoBorrowingStart())
        dispatch(getBorrowingInfoReturnedStart())

        
        let url = '/patron/profile/findProfile/?searchValue=' + search
        if(search)
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getStudentSuccess(response.data))

                //Overdued
                let url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + response.data.accountId + '?page=' + page + '&size=' + size + "&status=OVERDUED&sort=dueAt%2Casc"
                axios.get(url, { withCredentials: true })
                    .then(response => {
                        dispatch(getBorrowingInfoOverdueSuccess(response.data.content, response.data.totalElements, page, size))
                    })
                    .catch(error => {
                        dispatch(getBorrowingInfoOverdueFailed(responseError(error)))
                    });

                //Borrowing    
                url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + response.data.accountId + '?page=' + page + '&size=' + size + "&status=BORROWING&sort=borrowing.borrowedAt%2Cdesc"
                axios.get(url, { withCredentials: true })
                    .then(response => {
                        dispatch(getBorrowingInfoBorrowingSuccess(response.data.content, response.data.totalElements, page, size))
                    })
                    .catch(error => {
                        dispatch(getBorrowingInfoBorrowingFailed(responseError(error)))
                    });

                //Returned
                url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + response.data.accountId + '?page=' + page + '&size=' + size + "&status=RETURNED&sort=returnedAt%2Cdesc"
                axios.get(url, { withCredentials: true })
                    .then(response => {
                        dispatch(getBorrowingInfoReturnedSuccess(response.data.content, response.data.totalElements, page, size))
                    })
                    .catch(error => {
                        dispatch(getBorrowingInfoReturnedFailed(responseError(error)))
                    });


            })
            .catch(error => {
                dispatch(getStudentFailed(responseError(error)))
            });
        else dispatch(getStudentFailed("Get student info failed - Empty seach value"))    

        // let response=prototype.getStudent(search)
        // if(response.status){
        //     dispatch(getStudentSuccess(response.data))
        // }else{
        //     dispatch(getStudentFailed(response.err))
        // }
    }

}