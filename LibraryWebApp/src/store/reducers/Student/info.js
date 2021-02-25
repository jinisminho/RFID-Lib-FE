import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getBorrowingInfoStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getBorrowingInfoSuccess = (state, action) => {
  return updateObject(state, {
    dataOverdue: action.dataOverdue,
    dataBorrowing: action.dataBorrowing,
    dataReturned: action.dataReturned,
    totalOverdue: action.totalOverdue,
    totalBorrowing: action.totalBorrowing,
    totalReturned: action.totalReturned,
    errOnFetch: null,
    loading: false,
    pageOverdue: action.page + 1,
    pageBorrowing: action.page + 1,
    pageReturned: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBorrowingInfoFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    totalOverdue: 0,
    totalBorrowing: 0,
    totalReturned: 0,
    pageOverdue: 1,
    pageBorrowing: 1,
    pageReturned: 1,
    sizePerPage: 5,
    dataOverdue: null,
    dataBorrowing: null,
    dataReturned: null
  })
}
//Overdue
const getBorrowingInfoOverdueStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getBorrowingInfoOverdueSuccess = (state, action) => {
  return updateObject(state, {
    dataOverdue: action.data,
    totalOverdue: action.total,
    errOnFetch: null,
    loading: false,
    pageOverdue: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBorrowingInfoOverdueFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    totalOverdue: 0,
    totalBorrowing: 0,
    totalReturned: 0,
    pageOverdue: 1,
    pageBorrowing: 1,
    pageReturned: 1,
    sizePerPage: 5,
    dataOverdue: null,
    dataBorrowing: null,
    dataReturned: null
  })
}
//Borrowing
const getBorrowingInfoBorrowingStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getBorrowingInfoBorrowingSuccess = (state, action) => {
  return updateObject(state, {
    dataBorrowing: action.data,
    totalBorrowing: action.total,
    errOnFetch: null,
    loading: false,
    pageBorrowing: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBorrowingInfoBorrowingFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    totalOverdue: 0,
    totalBorrowing: 0,
    totalReturned: 0,
    pageOverdue: 1,
    pageBorrowing: 1,
    pageReturned: 1,
    sizePerPage: 5,
    dataOverdue: null,
    dataBorrowing: null,
    dataReturned: null
  })
}
//Returned
const getBorrowingInfoReturnedStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getBorrowingInfoReturnedSuccess = (state, action) => {
  return updateObject(state, {
    dataReturned: action.data,
    totalReturned: action.total,
    errOnFetch: null,
    loading: false,
    pageReturned: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getBorrowingInfoReturnedFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    totalOverdue: 0,
    totalBorrowing: 0,
    totalReturned: 0,
    pageOverdue: 1,
    pageBorrowing: 1,
    pageReturned: 1,
    sizePerPage: 5,
    dataOverdue: null,
    dataBorrowing: null,
    dataReturned: null
  })
}

const getExtendedHistoryInfoStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}
const getExtendedHistoryInfoSuccess = (state, action) => {
  return updateObject(state, {
    historyData: action.data,
    total: action.total,
    error: null,
    loading: false,
  })
}
const getExtendedHistoryInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 5,
    historyData: null,
  })
}

const extendDueStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const extendDueSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: 'Renewed successfully'
  })
}
const extendDueFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    successMsg: null
  })
}

const getStudentProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}
const getStudentProfileSuccess = (state, action) => {
  return updateObject(state, {
    profile: action.data,
    error: null,
    loading: false,
  })
}
const getStudentProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 5,
    profile: null,
  })
}

const updateStudentProfileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const updateStudentProfileSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: 'update profile success'
  })
}
const updateStudentProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 5,
    data: null,
  })
}

const getWishlistStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
  })
}
const getWishlistSuccess = (state, action)=>{
  return updateObject(state,{
      wishlistData: action.data,
      wishlistTotalSize:action.total,
      wishlistPage:action.page+1,
      loading:false
  })
}
const getWishlistFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      wishlistTotalSize:0,
      wishlistPage:1,
      
  })
}

const addReminderStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    successMsg: null
  })
}
const addReminderSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    successMsg: action.msg
  })
}
const addReminderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    successMsg: null
  })
}

//check policy renew
const checkPolicyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    newDueDate: null,
    policyViolation:null,
    ableToRenew: null
  })
}
const checkPolicySuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    newDueDate: action.newDueDate,
    policyViolation: action.policyViolation,
    isRenewable: action.isRenewable,
    isViolated: action.isViolated,
  })
}
const checkPolicyFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    newDueDate: null,
    policyViolation:null,
    ableToRenew: null
  })
}
export default function reducer(state = {
  dataOverdue: null,
  dataBorrowing: null,
  dataReturned: null,
  totalOverdue: 0,
  totalBorrowing: 0,
  totalReturned: 0,
  error: null,
  errOnFetch: null,
  loading: false,
  pageOverdue: 1,
  pageBorrowing: 1,
  pageReturned: 1,
  sizePerPage: 5,
  historyData: null,
  successMsg: null,
  profile: [],
  wishlistSizePerPage: 2,
  wishlistData: null,
  wishlistTotalSize:0,
  newDueDate: null,
  policyViolation: null,
  ableToRenew: null
}, action) {
  switch (action.type) {
    case actionTypes.PATRON_GET_BORROWINGINFO_START: return getBorrowingInfoStart(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_SUCCESS: return getBorrowingInfoSuccess(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_FAILED: return getBorrowingInfoFail(state, action)
    
    case actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_START: return getBorrowingInfoOverdueStart(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_SUCCESS: return getBorrowingInfoOverdueSuccess(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_OVERDUE_FAILED: return getBorrowingInfoOverdueFail(state, action)

    case actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_START: return getBorrowingInfoBorrowingStart(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_SUCCESS: return getBorrowingInfoBorrowingSuccess(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_BORROWING_FAILED: return getBorrowingInfoBorrowingFail(state, action)

    case actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_START: return getBorrowingInfoReturnedStart(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_SUCCESS: return getBorrowingInfoReturnedSuccess(state, action)
    case actionTypes.PATRON_GET_BORROWINGINFO_RETURNED_FAILED: return getBorrowingInfoReturnedFail(state, action)


    case actionTypes.PATRON_GET_DUEHISTORY_START: return getExtendedHistoryInfoStart(state, action)
    case actionTypes.PATRON_GET_DUEHISTORY_SUCCESS: return getExtendedHistoryInfoSuccess(state, action)
    case actionTypes.PATRON_GET_DUEHISTORY_FAILED: return getExtendedHistoryInfoFail(state, action)

    case actionTypes.PATRON_EXTEND_DUE_START: return extendDueStart(state, action)
    case actionTypes.PATRON_EXTEND_DUE_SUCCESS: return extendDueSuccess(state, action)
    case actionTypes.PATRON_EXTEND_DUE_FAILED: return extendDueFail(state, action)

    case actionTypes.PATRON_ADD_REMINDER_START: return addReminderStart(state, action)
    case actionTypes.PATRON_ADD_REMINDER_SUCCESS: return addReminderSuccess(state, action)
    case actionTypes.PATRON_ADD_REMINDER_FAILED: return addReminderFail(state, action)

    case actionTypes.PATRON_GET_PROFILE_START: return getStudentProfileStart(state, action)
    case actionTypes.PATRON_GET_PROFILE_SUCCESS: return getStudentProfileSuccess(state, action)
    case actionTypes.PATRON_GET_PROFILE_FAILED: return getStudentProfileFail(state, action)

    case actionTypes.PATRON_UPDATE_PROFILE_START: return updateStudentProfileStart(state, action)
    case actionTypes.PATRON_UPDATE_PROFILE_SUCCESS: return updateStudentProfileSuccess(state, action)
    case actionTypes.PATRON_UPDATE_PROFILE_FAILED: return updateStudentProfileFail(state, action)

    case actionTypes.PATRON_GET_WISHLIST_START: return getWishlistStart(state, action)
    case actionTypes.PATRON_GET_WISHLIST_SUCCESS: return getWishlistSuccess(state, action)
    case actionTypes.PATRON_GET_WISHLIST_FAILED: return getWishlistFail(state, action)  

    case actionTypes.PATRON_CHECK_POLICY_RENEW_START: return checkPolicyStart(state, action)
    case actionTypes.PATRON_CHECK_POLICY_RENEW_SUCCESS: return checkPolicySuccess(state, action)
    case actionTypes.PATRON_CHECK_POLICY_RENEW_FAILED: return checkPolicyFail(state, action)

  }
  return state
}
