import * as actionTypes from '../actionTypes'
import * as prototype from '../../prototype/Info'
import axios from '../../../axios'
import { responseError } from '../../utility'

//get Wishlist
export const getPolicySuccess = (data) => {
    return {
        type: actionTypes.PATRON_GET_POLICY_SUCCESS,
        data: data,
    }
}

export const getPolicyFailed = (error) => {
    return {
        type: actionTypes.PATRON_GET_POLICY_FAILED,
        error: error
    }
}

export const getPolicyStart = () => {
    return {
        type: actionTypes.PATRON_GET_POLICY_START
    }
}

export const getPolicy = () => {
    return dispatch => {
        dispatch(getPolicyStart())
        let url = '/patron/policy'
        axios.get(url, { withCredentials: true })
            .then(response => {
                dispatch(getPolicySuccess(response.data))
            })
            .catch(error => {
                dispatch(responseError(getPolicyFailed,error))
            });
    }

}

