import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    studentLoading:true
  })
}
const getStudentSuccess = (state, action)=>{
  return updateObject(state,{
      studentData: action.data,
      error:null,
      studentLoading:false,
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
    let bookList = [...state.bookData,action.bookData]
    return updateObject(state,{
        bookData: bookList,
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
      checkoutSuccess:false
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
  
  const getOverdueStart = (state, action) =>{
    return updateObject(state,{
      error:null, 
      studentLoading:true,
    })
  }
  const getOverdueSuccess = (state, action)=>{
    return updateObject(state,{
        studentLoading: false,
        error:null,
        overdueData:action.data
    })
  }
  const getOverdueFailed = (state, action) =>{
    return updateObject(state,{
        error:action.error,
        studentLoading:false
    })
  }


  const clearData = (state, action) =>{
    return updateObject(state,{
      studentData: null,
      error:null,
      bookData:[],
      overdueData:null,
      bookError:null,
      studentLoading:false,
      bookLoading:false,
      checkoutSuccess:false
    })
  }
  const clearBookError = (state, action) =>{
    return updateObject(state,{
      bookError:null,
    })
  }
  const deleteCheckoutBook=(state, action) =>{
    let tmp_books=[...state.bookData]
    tmp_books.forEach((book,idx)=> {
      if(book.id==action.id){
        tmp_books.splice(idx,1)
      }
    });
    return updateObject(state,{
      bookData:tmp_books
    })
  }
export default function reducer(state = {
    studentData: null,
    overdueData:null,
    error:null,
    bookData:[],
    bookError:null,
    studentLoading:false,
    bookLoading:false,
    checkoutSuccess:false
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

    case actionTypes.LIB_GET_OVERDUE_START: return getOverdueStart(state, action)
    case actionTypes.LIB_GET_OVERDUE_SUCCESS: return getOverdueSuccess(state, action)
    case actionTypes.LIB_GET_OVERDUE_FAILED: return getOverdueFailed(state, action)

    case actionTypes.CLEAR_CHECKOUT_DATA: return clearData(state, action)

    case actionTypes.CLEAR_BOOK_ERROR: return clearBookError(state, action)

    case actionTypes.DELETE_CHECKOUT_BOOK: return deleteCheckoutBook(state, action)
}
return state
}
 