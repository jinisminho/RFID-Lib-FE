import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/policy'
import axios from '../../../axios'
import { responseError } from '../../utility'

//Borrow
export const getBorrowPolicySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getBorrowPolicyFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_FAILED,
        error: error
    }
}

export const getBorrowPolicyStart = () => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_START
    }
}

export const getBorrowPolicy = (page, size, patronTypeId, bookCopyTypeId) => {
    return dispatch => {
        dispatch(getBorrowPolicyStart())

        let url = '/borrowPolicy/get' + '?page=' + page + '&size=' + size + (patronTypeId ? ('&patronTypeId=' + patronTypeId) : "") + (bookCopyTypeId ? ('&bookCopyTypeId=' + bookCopyTypeId) : "")
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getBorrowPolicySuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getBorrowPolicyFailed,error))
            });

        // let response=prototype.getBorrowPolicy(page,size)
        // if(response.status){
        //     dispatch(getBorrowPolicySuccess(response.data,response.total,page,size))
        // }else{
        //     dispatch(getBorrowPolicyFailed(response.err))
        // }
    }

}
//Patron
export const getPatronPolicySuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIB_GET_PATRON_POLICY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getPatronPolicyFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_PATRON_POLICY_FAILED,
        error: error
    }
}

export const getPatronPolicyStart = () => {
    return {
        type: actionTypes.LIB_GET_PATRON_POLICY_START
    }
}

export const getPatronPolicy = (page, size, searchValue) => {
    return dispatch => {
        dispatch(getPatronPolicyStart())

        let url = '/patronType/find' + '?page=' + page + '&size=' + size + (searchValue ? ('&name=' + searchValue) : '')
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getPatronPolicySuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getPatronPolicyFailed,error))
            });

        // let response=prototype.getPatronPolicy(page,size)
        // if(response.status){
        //     dispatch(getPatronPolicySuccess(response.data,response.total,page,size))
        // }else{
        //     dispatch(getPatronPolicyFailed(response.err))
        // }
    }

}
//Fee
export const getFeePolicySuccess = (data) => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_SUCCESS,
        data: data,
    }
}

export const getFeePolicyFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_FAILED,
        error: error
    }
}

export const getFeePolicyStart = () => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_START
    }
}

export const getFeePolicy = () => {
    return dispatch => {
        dispatch(getFeePolicyStart())


        let url = '/feePolicy/getLatest'
        axios.get(url, { withCredentials: true })
            .then(response => {
                let arr = []
                arr[0] = response.data;
                dispatch(getFeePolicySuccess(arr))
            })
            .catch(error => {
                dispatch(responseError(getFeePolicyFailed,error))
            });

        // let response = prototype.getFeePolicy()
        // if (response.status) {
        //     dispatch(getFeePolicySuccess(response.data, response.total, page, size))
        // } else {
        //     dispatch(getFeePolicyFailed(response.err))
        // }
    }

}

//get Patron Types

export const getPatronTypeSuccess = (data) => {
    return {
        type: actionTypes.GET_PATRON_TYPE_SUCCESS,
        data: data,
    }
}

export const getPatronTypeFailed = (error) => {
    return {
        type: actionTypes.GET_PATRON_TYPE_FAILED,
        error: error
    }
}

export const getPatronTypeStart = () => {
    return {
        type: actionTypes.GET_PATRON_TYPE_START
    }
}

export const getPatronType = () => {
    return dispatch => {
        dispatch(getPatronTypeStart())

        let url = '/patronType/getAll'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getPatronTypeSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getPatronTypeFailed,error))
            });

        // if (response.status) {
        //     dispatch(getPatronTypeSuccess(response.data))
        // } else {
        //     dispatch(getPatronTypeFailed(response.err))
        // }
    }

}

//Add borrow policy

export const addBorrowPolicyStart = () => {
    return ({
        type: actionTypes.ADD_BORROW_POLICY_START
    })
}
export const addBorrowPolicyFail = (error) => {
    return ({
        type: actionTypes.ADD_BORROW_POLICY_FAILED,
        error: error
    })
}
export const addBorrowPolicySuccess = () => {
    return ({
        type: actionTypes.ADD_BORROW_POLICY_SUCCESS,
    })
}

export const addBorrowPolicy = (data) => {
    return dispatch => {
        dispatch(addBorrowPolicyStart())

        let url = '/borrowPolicy/add'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(addBorrowPolicySuccess())
            })
            .catch(error => {
                dispatch(responseError(addBorrowPolicyFail,error))
            });

        // let response = prototype.addBorrowPolicy(data)
        // if (response.status == true) {
        //     dispatch(addBorrowPolicySuccess())
        // } else {
        //     dispatch(addBorrowPolicyFail(response.error))
        // }
    }
}

//Update borrow policy

export const updateBorrowPolicyStart = () => {
    return ({
        type: actionTypes.UPDATE_BORROW_POLICY_START
    })
}
export const updateBorrowPolicyFail = (error) => {
    return ({
        type: actionTypes.UPDATE_BORROW_POLICY_FAILED,
        error: error
    })
}
export const updateBorrowPolicySuccess = () => {
    return ({
        type: actionTypes.UPDATE_BORROW_POLICY_SUCCESS,
    })
}

export const updateBorrowPolicy = (data) => {
    return dispatch => {
        dispatch(updateBorrowPolicyStart())

        let url = '/borrowPolicy/update'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(updateBorrowPolicySuccess())
            })
            .catch(error => {
                dispatch(responseError(updateBorrowPolicyFail,error))
            });

        // let response = prototype.updateBorrowPolicy(data)
        // if (response.status == true) {
        //     dispatch(updateBorrowPolicySuccess())
        // } else {
        //     dispatch(updateBorrowPolicyFail(response.error))
        // }
    }
}

//Delete borrow policy

export const deleteBorrowPolicyStart = () => {
    return ({
        type: actionTypes.DELETE_BORROW_POLICY_START
    })
}
export const deleteBorrowPolicyFail = (error) => {
    return ({
        type: actionTypes.DELETE_BORROW_POLICY_FAILED,
        error: error
    })
}
export const deleteBorrowPolicySuccess = () => {
    return ({
        type: actionTypes.DELETE_BORROW_POLICY_SUCCESS,
    })
}

export const deleteBorrowPolicy = (id) => {
    return dispatch => {
        dispatch(deleteBorrowPolicyStart())

        let url = '/borrowPolicy/delete?id=' + id
        axios.post(url, {}, { withCredentials: true })
            .then(response => {
                dispatch(deleteBorrowPolicySuccess())
            })
            .catch(error => {
                dispatch(responseError(deleteBorrowPolicyFail,error))
            });
    }
}

//Update patron policy

export const updatePatronPolicyStart = () => {
    return ({
        type: actionTypes.UPDATE_PATRON_POLICY_START
    })
}
export const updatePatronPolicyFail = (error) => {
    return ({
        type: actionTypes.UPDATE_PATRON_POLICY_FAILED,
        error: error
    })
}
export const updatePatronPolicySuccess = () => {
    return ({
        type: actionTypes.UPDATE_PATRON_POLICY_SUCCESS,
    })
}

export const updatePatronPolicy = (data) => {
    return dispatch => {
        dispatch(updatePatronPolicyStart())

        let url = '/patronType/updatePolicy'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(updatePatronPolicySuccess())
            })
            .catch(error => {
                dispatch(responseError(updatePatronPolicyFail,error))
            });

        // let response = prototype.updatePatronPolicy(data)
        // if (response.status == true) {
        //     dispatch(updatePatronPolicySuccess())
        // } else {
        //     dispatch(updatePatronPolicyFail(response.error))
        // }
    }
}

//Fee policy history
export const getFeePoliciesSuccess = (data, total, page, sizePerPage) => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_HISTORY_SUCCESS,
        total: total,
        data: data,
        page: page,
        sizePerPage: sizePerPage
    }
}

export const getFeePoliciesFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_HISTORY_FAILED,
        error: error
    }
}

export const getFeePoliciesStart = () => {
    return {
        type: actionTypes.LIB_GET_FEE_POLICY_HISTORY_START
    }
}

export const getFeePolicies = (page, size) => {
    return dispatch => {
        dispatch(getFeePoliciesStart())

        let url = '/feePolicy/find' + '?page=' + page + '&size=' + size
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getFeePoliciesSuccess(response.data.content, response.data.totalElements, page, size))
            })
            .catch(error => {
                dispatch(responseError(getFeePoliciesFailed,error))
            });

        // let response = prototype.getFeePolicies(page, size)
        // if (response.status) {
        //     dispatch(getFeePoliciesSuccess(response.data, response.total, page, size))
        // } else {
        //     dispatch(getFeePoliciesFailed(response.err))
        // }
    }

}

//Update fee policy

export const updateFeePolicyStart = () => {
    return ({
        type: actionTypes.UPDATE_FEE_POLICY_START
    })
}
export const updateFeePolicyFail = (error) => {
    return ({
        type: actionTypes.UPDATE_FEE_POLICY_FAILED,
        error: error
    })
}
export const updateFeePolicySuccess = () => {
    return ({
        type: actionTypes.UPDATE_FEE_POLICY_SUCCESS,
    })
}

export const updateFeePolicy = (data) => {
    return dispatch => {
        dispatch(updateFeePolicyStart())

        let url = '/feePolicy/add'
        axios.post(url, data, { withCredentials: true })
            .then(response => {
                dispatch(updateFeePolicySuccess())
            })
            .catch(error => {
                dispatch(responseError(updateFeePolicyFail,error))
            });

        // let response = prototype.updateFeePolicy(data)
        // if (response.status == true) {
        //     dispatch(updateFeePolicySuccess())
        // } else {
        //     dispatch(updateFeePolicyFail(response.error))
        // }
    }
}

//Borrow's types
export const getTypesForBorrowSuccess = (data) => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_TYPES_SUCCESS,
        data: data,
    }
}

export const getTypesForBorrowFailed = (error) => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_TYPES_FAILED,
        error: error
    }
}

export const getTypesForBorrowStart = () => {
    return {
        type: actionTypes.LIB_GET_BORROW_POLICY_TYPES_START
    }
}

export const getTypesForBorrow = () => {
    return dispatch => {
        dispatch(getTypesForBorrowStart())

        let url = '/borrowPolicy/getTypes'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getTypesForBorrowSuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getTypesForBorrowFailed,error))
            });

    }

}