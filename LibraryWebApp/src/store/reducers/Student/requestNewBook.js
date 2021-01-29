import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'

const requestNewBookSuccess = (state, action) => {
   return updateObject(state, {
    error: null,
    loading: false,
    success: true,
  })
}

const requestNewBookFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        success: true,
      })
}

const requestNewBookStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        success: false,
    })
}

const refreshRequest = (state, action) => {
    return {
        loading: false,
        error: null,
        success: false
    }
}

export default function reducer (
    state ={
        loading: false,
        error: null,
        success: false
    },
    action
){
    switch (action.type){
        case actionTypes.ST_REQUEST_NEW_BOOK_START: return requestNewBookStart(state, action)
        case actionTypes.ST_REQUEST_NEW_BOOK_SUCCESS: return requestNewBookSuccess(state, action)
        case actionTypes.ST_REQUEST_NEW_BOOK_FAILED: return requestNewBookFailed(state, action)

        case actionTypes.ST_REQUEST_NEW_BOOK_REFRESH: return refreshRequest(state, action)
    }
    return state
}