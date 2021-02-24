import * as actionTypes from '../../actions/actionTypes'
import { updateObject } from '../../utility'


const getRentingInfoStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true
  })
}
const getRentingInfoSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    total: action.total,
    errOnFetch: null,
    loading: false,
    page: action.page + 1,
    sizePerPage: action.sizePerPage
  })
}
const getRentingInfoFail = (state, action) => {
  return updateObject(state, {
    errOnFetch: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
    data: null,
  })
}

//Overdue
const getBorrowingInfoOverdueStart = (state, action) => {
  return updateObject(state, {
    errOnFetch: null,
    loading: true,
    totalOverdue: 0,
    pageOverdue: 1,
    sizePerPage: 5,
    dataOverdue: null,
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
    loading: true,
    totalBorrowing: 0,
    pageBorrowing: 1,
    sizePerPage: 5,
    dataBorrowing: null,
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
    loading: true,
    totalReturned: 0,
    pageReturned: 1,
    sizePerPage: 5,
    dataReturned: null
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
//ExtendedHistories
const getExtendedHistoryInfoStart = (state, action) => {
  return updateObject(state, {
    error: null,
    // loading: true,
  })
}
const getExtendedHistoryInfoSuccess = (state, action) => {
  return updateObject(state, {
    historyData: action.data,
    total: action.total,
    error: null,
    loading: false,
    page: action.page,
    sizePerPage: action.sizePerPage
  })
}
const getExtendedHistoryInfoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    total: 0,
    page: 1,
    sizePerPage: 10,
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

const getStudentStart = (state, action) => {
  return updateObject(state, {
    error: null,
    studentLoading: true,
    loading: true,
    studentData: null,
    page: 1
  })
}
const getStudentSuccess = (state, action) => {
  return updateObject(state, {
    studentData: action.data,
    error: null,
    studentLoading: false,
    loading: false,
    page: 1
  })
}
const getStudentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    studentLoading: false,
    loading: false,
    studentData: null,
    page: 1
  })
}

export default function reducer(state = {
  data: null,
  total: 0,
  error: null,
  errOnFetch: null,
  loading: false,
  page: 1,
  sizePerPage: 5,
  historyData: null,
  successMsg: null,
  studentLoading: false,
  studentData: null,

  dataOverdue: null,
  dataBorrowing: null,
  dataReturned: null,
  totalOverdue: 0,
  totalBorrowing: 0,
  totalReturned: 0,
  pageOverdue: 1,
  pageBorrowing: 1,
  pageReturned: 1,

}, action) {
  switch (action.type) {
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_START: return getRentingInfoStart(state, action)
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_SUCCESS: return getRentingInfoSuccess(state, action)
    case actionTypes.LIBRARIAN_GET_RENTINGINFO_FAILED: return getRentingInfoFail(state, action)

    case actionTypes.LIBRARIAN_GET_DUEHISTORY_START: return getExtendedHistoryInfoStart(state, action)
    case actionTypes.LIBRARIAN_GET_DUEHISTORY_SUCCESS: return getExtendedHistoryInfoSuccess(state, action)
    case actionTypes.LIBRARIAN_GET_DUEHISTORY_FAILED: return getExtendedHistoryInfoFail(state, action)

    case actionTypes.LIBRARIAN_EXTEND_DUE_START: return extendDueStart(state, action)
    case actionTypes.LIBRARIAN_EXTEND_DUE_SUCCESS: return extendDueSuccess(state, action)
    case actionTypes.LIBRARIAN_EXTEND_DUE_FAILED: return extendDueFail(state, action)

    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_START: return getStudentStart(state, action)
    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_SUCCESS: return getStudentSuccess(state, action)
    case actionTypes.LIBRARIAN_INFO_GET_STUDENT_FAILED: return getStudentFail(state, action)

    case actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_START: return getBorrowingInfoOverdueStart(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_SUCCESS: return getBorrowingInfoOverdueSuccess(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_OVERDUE_FAILED: return getBorrowingInfoOverdueFail(state, action)

    case actionTypes.LIB_GET_BORROWINGINFO_BORROWING_START: return getBorrowingInfoBorrowingStart(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_BORROWING_SUCCESS: return getBorrowingInfoBorrowingSuccess(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_BORROWING_FAILED: return getBorrowingInfoBorrowingFail(state, action)

    case actionTypes.LIB_GET_BORROWINGINFO_RETURNED_START: return getBorrowingInfoReturnedStart(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_RETURNED_SUCCESS: return getBorrowingInfoReturnedSuccess(state, action)
    case actionTypes.LIB_GET_BORROWINGINFO_RETURNED_FAILED: return getBorrowingInfoReturnedFail(state, action)

  }
  return state
}
