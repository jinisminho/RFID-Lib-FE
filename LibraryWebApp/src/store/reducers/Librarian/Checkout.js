import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    studentLoading:true
  })
}
const getStudentSuccess = (state, action)=>{
  return updateObject(state,{
      studentData: action.data.patronAccountInfo,
      error:null,
      studentLoading:false,
      overdueData:action.data.overdueBooks
  })
}
const getStudentFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      studentLoading:false,
  })
}

const getBookStart = (state, action) =>{
    return updateObject(state,{
      bookError:null, 
      bookLoading:true,
    })
  }
  const getBookSuccess = (state, action)=>{
    let valid=[...state.validBook]
    let invalid = [...state.invalidBook]
    if(action.bookData.violatePolicy){
      invalid.push(action.bookData)
    }else{
      valid.push(action.bookData)
    }
    return updateObject(state,{
        validBook: valid,
        invalidBook:invalid,
        bookError:null,
        bookLoading:false,
    })
  }
  const getBookFail = (state, action) =>{
    return updateObject(state,{
        bookError:action.error,
        bookLoading:false,
    })
  }



  const checkoutStart = (state, action) =>{
    return updateObject(state,{
      error:null, 
      bookLoading:true,
      checkoutSuccess:false,
      warning:null,
      confirmSuccess:false
    })
  }
  const checkoutSuccess = (state, action)=>{
    return updateObject(state,{
        bookLoading: false,
        error:null,
        checkoutSuccess:true
    })
  }
  const checkoutFailed = (state, action) =>{
    return updateObject(state,{
        error:action.error,
        bookLoading:false,
        checkoutSuccess:false
    })
  }
  
  const checkPolicyStart = (state, action) =>{
    return updateObject(state,{
      error:null, 
      warning:null,
      bookLoading:true,
      confirmSuccess:false
    })
  }
  const checkPolicySuccess = (state, action)=>{
    return updateObject(state,{
        bookLoading: false,
        error:null,
        warning:action.data,
        confirmSuccess:true
    })
  }
  const checkPolicyFailed = (state, action) =>{
    return updateObject(state,{
        error:action.error,
        bookLoading:false,
        confirmSuccess:false
    })
  }
  const clearData = (state, action) =>{
    return updateObject(state,{
      studentData: null,
      error:null,
      validBook:[],
      invalidBook:[],
      overdueData:null,
      bookError:null,
      studentLoading:false,
      bookLoading:false,
      checkoutSuccess:false,
      warning:null
    })
  }
  const cancelConfirm = (state, action) =>{
    return updateObject(state,{
      warning:null,
      confirmSuccess:false
    })
  }
  const clearBookError = (state, action) =>{
    return updateObject(state,{
      bookError:null,
    })
  }
  const deleteCheckoutBook=(state, action) =>{
    let tmp_books=[...state.validBook]
    let length = tmp_books.length
    let idx=-1
    for(let i=0;i<length;i++){
      if(tmp_books[i].copy.id==action.id){
        idx=i
      }
    }
    if(idx!=-1){
      tmp_books.splice(idx,1)
    }

    return updateObject(state,{
      validBook:tmp_books
    })
  }

  const closeToast=(state, action) =>{
    let tmp_books=[...state.invalidBook]
    let length = tmp_books.length
    let idx=-1
    for(let i=0;i<length;i++){
      if(tmp_books[i].copy.id==action.id){
        idx=i
      }
    }
    if(idx!=-1){
      tmp_books.splice(idx,1)
    }

    return updateObject(state,{
      invalidBook:tmp_books
    })
  }
export default function reducer(state = {
    studentData: null,
    overdueData:null,
    error:null,
    validBook:[],
    invalidBook:[],
    bookError:null,
    studentLoading:false,
    bookLoading:false,
    checkoutSuccess:false,
    warning:null,
    confirmSuccess:false,
}, action) {
  switch(action.type){
    case actionTypes.GET_STUDENT_START: return getStudentStart(state, action)
    case actionTypes.GET_STUDENT_SUCCESS: return getStudentSuccess(state, action)
    case actionTypes.GET_STUDENT_FAILED: return getStudentFail(state, action)

    case actionTypes.GET_STUDENT_BOOK_START: return getBookStart(state, action)
    case actionTypes.GET_STUDENT_BOOK_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.GET_STUDENT_BOOK_FAILED: return getBookFail(state, action)

    case actionTypes.LIB_CHECKOUT_START: return checkoutStart(state, action)
    case actionTypes.LIB_CHECKOUT_SUCCESS: return checkoutSuccess(state, action)
    case actionTypes.LIB_CHECKOUT_FAILED: return checkoutFailed(state, action)


    case actionTypes.CHECK_POLICY_START: return checkPolicyStart(state, action)
    case actionTypes.CHECK_POLICY_SUCCESS: return checkPolicySuccess(state, action)
    case actionTypes.CHECK_POLICY_FAILED: return checkPolicyFailed(state, action)

    case actionTypes.CLEAR_CHECKOUT_DATA: return clearData(state, action)

    case actionTypes.CLEAR_BOOK_ERROR: return clearBookError(state, action)

    case actionTypes.CANCEL_CHECKOUT_CONFIRM: return cancelConfirm(state, action)

    case actionTypes.DELETE_CHECKOUT_BOOK: return deleteCheckoutBook(state, action)

    case actionTypes.CLOSE_ERROR_TOAST: return closeToast(state, action)

}
return state
}
 