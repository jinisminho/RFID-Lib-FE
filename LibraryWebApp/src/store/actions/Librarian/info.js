import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import MyUtil from "store/utility"
import axios from '../../../axios'
import { responseError } from '../../utility'


//getRentingInfo
export const getRentingInfoSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIBRARIAN_GET_RENTINGINFO_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
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

export const getRentingInfo = (page, size, studentId) => {
    return dispatch => {
        dispatch(getRentingInfoStart())
        let response = prototype.getRentingInfos(studentId)
        if (!studentId) response.status = false
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
            let url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + search + '?page=' + page + '&size=' + size + "&status=OVERDUED"
            axios.get(url, { withCredentials: true })
                .then(response => {
                    dispatch(getBorrowingInfoOverdueSuccess(response.data.content, response.data.totalElements, page, size))
                })
                .catch(error => {
                    dispatch(getBorrowingInfoOverdueFailed(responseError(error.response.data.status, error.response.data)))
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
                    dispatch(getBorrowingInfoBorrowingFailed(responseError(error.response.data.status, error.response.data)))
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
                    dispatch(getBorrowingInfoReturnedFailed(responseError(error.response.data.status, error.response.data)))
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
export const getExtendedHistorySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIBRARIAN_GET_DUEHISTORY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
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
            prototype.addDueDate(studentId, bookId).status ? response = { "status": true } : response = { "err": "Error at extendDue", "status": false };
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

        let url = '/patron/profile/findProfile/?searchValue=' + search
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
                        dispatch(getBorrowingInfoOverdueFailed(responseError(error.response.data.status, error.response.data)))
                    });

                //Borrowing    
                url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + response.data.accountId + '?page=' + page + '&size=' + size + "&status=BORROWING&sort=borrowing.borrowedAt%2Cdesc"
                axios.get(url, { withCredentials: true })
                    .then(response => {
                        dispatch(getBorrowingInfoBorrowingSuccess(response.data.content, response.data.totalElements, page, size))
                    })
                    .catch(error => {
                        dispatch(getBorrowingInfoBorrowingFailed(responseError(error.response.data.status, error.response.data)))
                    });

                //Returned
                url = '/patron/borrowingHistory/getBorrowingHistoriesWithStatus/' + response.data.accountId + '?page=' + page + '&size=' + size + "&status=RETURNED&sort=returnedAt%2Cdesc"
                axios.get(url, { withCredentials: true })
                    .then(response => {
                        dispatch(getBorrowingInfoReturnedSuccess(response.data.content, response.data.totalElements, page, size))
                    })
                    .catch(error => {
                        dispatch(getBorrowingInfoReturnedFailed(responseError(error.response.data.status, error.response.data)))
                    });


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