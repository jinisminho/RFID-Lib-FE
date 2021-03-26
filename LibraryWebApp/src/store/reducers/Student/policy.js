import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getPolicyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}
const getPolicySuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
  })
}
const getPolicyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}

export default function reducer(state = {
  data: null,
  error: null,
  loading: false,
}, action) {
  switch (action.type) {
    case actionTypes.PATRON_GET_POLICY_START: return getPolicyStart(state, action)
    case actionTypes.PATRON_GET_POLICY_SUCCESS: return getPolicySuccess(state, action)
    case actionTypes.PATRON_GET_POLICY_FAILED: return getPolicyFail(state, action)
  }
  return state
}
