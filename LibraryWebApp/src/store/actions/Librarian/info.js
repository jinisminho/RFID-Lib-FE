import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import MyUltil from "store/ultility"


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
        let response=prototype.getRentingInfos()
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

// export const extendDue = (date, libraryCardId) => {
//     return dispatch => {

//         dispatch(extendDueStart())

//         let response

//         if(!date && !libraryCardId) {
//             response = {"err":"Error at extendDue","status":false}
//         } else if (MyUltil.compareDate(date, Date.now()) < 0) {
//             response = {"err":"Date can not smaller than Date right now","status":false}
//         } else {
//             response= {"status":true};
//         }

//         if(response.status){
//             dispatch(extendDueSuccess(response.status))
//         }else{
//             dispatch(extendDueFailed(response.err))
//         }

//         // let stuId = localStorage.getItem('userId')
//         // let url='/books'
//         // if(search){
//         //     url+='?page='+page+'&size='+size+"&name="+search
//         // }else {
//         //     url+='?page='+page+'&size='+size
//         // }
//         // axios.get(url, { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
//         //     .then(response => {
//         //         dispatch(getBookSuccess(response.data.content, response.data.totalElements, page, size))
//         //     })
//         //     .catch(error => {
//         //         dispatch(getBookFail(error))
//         //     });
//     }
// }

export const extendDue = (libraryCardId) => {
    return dispatch => {

        console.log(libraryCardId);

        dispatch(extendDueStart())

        let response

        if(!libraryCardId) {
            response = {"err":"Error at extendDue","status":false}
        }else {
            response= {"status":true};
        }

        if(response.status){
            dispatch(extendDueSuccess(response.status))
        }else{
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