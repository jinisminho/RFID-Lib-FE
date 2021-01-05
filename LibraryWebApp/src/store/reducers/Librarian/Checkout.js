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


export default function reducer(state = {
    studentData: null,
    error:null,
    bookData:[],
    bookError:null,
    studentLoading:false,
    bookLoading:false,
    
}, action) {
  switch(action.type){
    case actionTypes.GET_STUDENT_START: return getStudentStart(state, action)
    case actionTypes.GET_STUDENT_SUCCESS: return getStudentSuccess(state, action)
    case actionTypes.GET_STUDENT_FAILED: return getStudentFail(state, action)

    case actionTypes.GET_STUDENT_BOOK_START: return getBookStart(state, action)
    case actionTypes.GET_STUDENT_BOOK_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.GET_STUDENT_BOOK_FAILED: return getBookFail(state, action)
}
return state
}
 