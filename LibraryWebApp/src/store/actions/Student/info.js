import * as actionTypes from '../actionTypes'
import * as studentPrototype from '../../prototype/rentingInfo'

export const getRentingInfoSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.STUDENT_GET_RENTINGINFO_SUCCESS,
        total:total,
        data: data,
        page:page,
        sizePerPage:sizePerPage
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

export const getRentingInfo = (page,size,search) => {
    return dispatch => {
        dispatch(getRentingInfoStart())
        let response=studentPrototype.getRentingInfos()
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