import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'



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

const clearReturnBook=(state, action) =>{
  return updateObject(state,{
    bookData:[]
})
}
const clearReturnBookError=(state, action) =>{
  return updateObject(state,{
    bookError:null
})
}

export default function reducer(state = {
    bookData:[],
    bookError:null,
    bookLoading:false,
    
}, action) {
  switch(action.type){
    case actionTypes.CLEAR_RETURN_BOOK: return clearReturnBook(state, action)
    case actionTypes.CLEAR_RETURN_BOOK_ERROR: return clearReturnBookError(state, action)

    case actionTypes.LIB_RETURN_GET_BOOK_START: return getReturningBookStart(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_SUCCESS: return getReturningBookSuccess(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_FAILED: return getReturningBookFail(state, action)
}
return state
}
 