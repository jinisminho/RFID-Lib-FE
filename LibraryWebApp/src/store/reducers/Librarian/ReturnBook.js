import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getReturningStudentStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    studentLoading:true
  })
}
const getReturningStudentSuccess = (state, action)=>{
  return updateObject(state,{
      studentData: action.data,
      error:null,
      studentLoading:false,
  })
}
const getReturningStudentFailed = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      studentLoading:false,
  })
}


const getReturningBookStart = (state, action) =>{
  return updateObject(state,{
    bookError:null, 
    bookLoading:true,
  })
}
const getReturningBookSuccess = (state, action)=>{
  let bookList = [...state.bookData,action.bookData ]
  return updateObject(state,{
      bookData: bookList,
      bookError:null,
      bookLoading:false,
  })
}
const getReturningBookFail = (state, action) =>{
  return updateObject(state,{
      bookError:action.error,
      bookLoading:false,
  })
}



export default function reducer(state = {
    studentData: null,
    error:null,
    bookData:[],
    bookError:null,
    studentLoading:false,
    bookLoading:false,
    
}, action) {
  switch(action.type){
    case actionTypes.LIB_RETURN_GET_STUDENT_START: return getReturningStudentStart(state, action)
    case actionTypes.LIB_RETURN_GET_STUDENT_SUCCESS: return getReturningStudentSuccess(state, action)
    case actionTypes.LIB_RETURN_GET_STUDENT_FAILED: return getReturningStudentFailed(state, action)

    case actionTypes.LIB_RETURN_GET_BOOK_START: return getReturningBookStart(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_SUCCESS: return getReturningBookSuccess(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_FAILED: return getReturningBookFail(state, action)
}
return state
}
 