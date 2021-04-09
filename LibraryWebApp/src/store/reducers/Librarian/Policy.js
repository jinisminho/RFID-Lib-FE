import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


//borrow
const getBorrowPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getBorrowPolicySuccess = (state, action) => {
    return updateObject(state, {
        borrowPolicy: action.data,
        borrowTotal: action.total,
        borrowPage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getBorrowPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//patron
const getPatronPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getPatronPolicySuccess = (state, action) => {
    return updateObject(state, {
        patronPolicy: action.data,
        patronTotal: action.total,
        patronPage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getPatronPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//fee
const getFeePolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getFeePolicySuccess = (state, action) => {
    return updateObject(state, {
        feePolicy: action.data,
        error: null,
        loading: false,
    })
}
const getFeePolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//patronTypes
const getPatronTypeStart = (state, action) => {

    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getPatronTypeSuccess = (state, action) => {
    return updateObject(state, {
        patronTypes: action.data,
        error: null,
        loading: false,
    })
}
const getPatronTypeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//add borrow policy
const addBorrowPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        successMsg: null,
        addSuccess: false,
    })
}
const addBorrowPolicySuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        successMsg: "Borrow policy successfully added",
        addSuccess: true
    })
}
const addBorrowPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//update borrow policy
const updateBorrowPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        updateSuccess: false,
    })
}
const updateBorrowPolicySuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        successMsg: "Borrow policy successfully updated",
        updateSuccess: true
    })
}
const updateBorrowPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//delete borrow policy
const deleteBorrowPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        deleteSuccess: false,
    })
}
const deleteBorrowPolicySuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Borrow policy successfully deleted",
        loading: false,
        deleteSuccess: true
    })
}
const deleteBorrowPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
        total: 0,
    })
}

//update patron policy
const updatePatronPolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        updateSuccess: false,
    })
}
const updatePatronPolicySuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Patron policy successfully updated",
        loading: false,
        updateSuccess: true
    })
}
const updatePatronPolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//fee policy history
const getFeePoliciesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getFeePoliciesSuccess = (state, action) => {
    return updateObject(state, {
        feePolicies: action.data,
        feeTotal: action.total,
        feePage: action.page + 1,
        error: null,
        loading: false,
    })
}
const getFeePoliciesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

//update patron policy
const updateFeePolicyStart = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: null,
        loading: true,
        updateSuccess: false,
    })
}
const updateFeePolicySuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        successMsg: "Fee policy successfully updated",
        loading: false,
        updateSuccess: true
    })
}
const updateFeePolicyFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        successMsg: null,
        loading: false,
    })
}

//borrow's types
const getTypesForBorrowStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}
const getTypesForBorrowSuccess = (state, action) => {
    return updateObject(state, {
        borrowTypes: action.data,
        error: null,
        loading: false,
    })
}
const getTypesForBorrowFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}


export default function reducer(state = {
    borrowPolicy: [],
    patronPolicy: [],
    feePolicy: [],
    feePolicies: [],
    error: null,
    loading: false,
    borrowTotal: 0,
    patronTotal: 0,
    feeTotal: 0,
    borrowPage: 1,
    patronPage: 1,
    feePage: 1,
    feeSizePerPage: 5,
    sizePerPage: 10,
    successMsg: null,
    patronTypes: null,
    updateSuccess: null,
    borrowTypes: null,
}, action) {
    switch (action.type) {

        case actionTypes.LIB_GET_BORROW_POLICY_START: return getBorrowPolicyStart(state, action)
        case actionTypes.LIB_GET_BORROW_POLICY_SUCCESS: return getBorrowPolicySuccess(state, action)
        case actionTypes.LIB_GET_BORROW_POLICY_FAILED: return getBorrowPolicyFail(state, action)

        case actionTypes.LIB_GET_PATRON_POLICY_START: return getPatronPolicyStart(state, action)
        case actionTypes.LIB_GET_PATRON_POLICY_SUCCESS: return getPatronPolicySuccess(state, action)
        case actionTypes.LIB_GET_PATRON_POLICY_FAILED: return getPatronPolicyFail(state, action)

        case actionTypes.LIB_GET_FEE_POLICY_START: return getFeePolicyStart(state, action)
        case actionTypes.LIB_GET_FEE_POLICY_SUCCESS: return getFeePolicySuccess(state, action)
        case actionTypes.LIB_GET_FEE_POLICY_FAILED: return getFeePolicyFail(state, action)

        case actionTypes.GET_PATRON_TYPE_START: return getPatronTypeStart(state, action)
        case actionTypes.GET_PATRON_TYPE_SUCCESS: return getPatronTypeSuccess(state, action)
        case actionTypes.GET_PATRON_TYPE_FAILED: return getPatronTypeFail(state, action)

        case actionTypes.ADD_BORROW_POLICY_START: return addBorrowPolicyStart(state, action)
        case actionTypes.ADD_BORROW_POLICY_SUCCESS: return addBorrowPolicySuccess(state, action)
        case actionTypes.ADD_BORROW_POLICY_FAILED: return addBorrowPolicyFail(state, action)

        case actionTypes.UPDATE_BORROW_POLICY_START: return updateBorrowPolicyStart(state, action)
        case actionTypes.UPDATE_BORROW_POLICY_SUCCESS: return updateBorrowPolicySuccess(state, action)
        case actionTypes.UPDATE_BORROW_POLICY_FAILED: return updateBorrowPolicyFail(state, action)

        case actionTypes.DELETE_BORROW_POLICY_START: return deleteBorrowPolicyStart(state, action)
        case actionTypes.DELETE_BORROW_POLICY_SUCCESS: return deleteBorrowPolicySuccess(state, action)
        case actionTypes.DELETE_BORROW_POLICY_FAILED: return deleteBorrowPolicyFail(state, action)

        case actionTypes.UPDATE_PATRON_POLICY_START: return updatePatronPolicyStart(state, action)
        case actionTypes.UPDATE_PATRON_POLICY_SUCCESS: return updatePatronPolicySuccess(state, action)
        case actionTypes.UPDATE_PATRON_POLICY_FAILED: return updatePatronPolicyFail(state, action)

        case actionTypes.LIB_GET_FEE_POLICY_HISTORY_START: return getFeePoliciesStart(state, action)
        case actionTypes.LIB_GET_FEE_POLICY_HISTORY_SUCCESS: return getFeePoliciesSuccess(state, action)
        case actionTypes.LIB_GET_FEE_POLICY_HISTORY_FAILED: return getFeePoliciesFail(state, action)

        case actionTypes.UPDATE_FEE_POLICY_START: return updateFeePolicyStart(state, action)
        case actionTypes.UPDATE_FEE_POLICY_SUCCESS: return updateFeePolicySuccess(state, action)
        case actionTypes.UPDATE_FEE_POLICY_FAILED: return updateFeePolicyFail(state, action)

        case actionTypes.LIB_GET_BORROW_POLICY_TYPES_START: return getTypesForBorrowStart(state, action)
        case actionTypes.LIB_GET_BORROW_POLICY_TYPES_SUCCESS: return getTypesForBorrowSuccess(state, action)
        case actionTypes.LIB_GET_BORROW_POLICY_TYPES_FAILED: return getTypesForBorrowFailed(state, action)
    }
    return state
}
