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

const returnBookStart = (state, action) =>{
  return updateObject(state,{
    bookError:null, 
    bookLoading:true,
  })
}
const returnBookSuccess = (state, action)=>{
  return updateObject(state,{
      bookData: [],
      bookError:null,
      bookLoading:false,
      returnSuccess:true
  })
}
const returnBookFail = (state, action) =>{
  return updateObject(state,{
      bookError:action.error,
      bookLoading:false,
      bookData:[]
  })
}


const clearReturnBook=(state, action) =>{
  return updateObject(state,{
    bookData:[],
    bookError:null,
    bookLoading:false,
    returnSuccess:false
})
}
const clearReturnBookError=(state, action) =>{
  return updateObject(state,{
    bookError:null
})
}

const deleteReturnBook=(state, action) =>{
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
    bookData:[],
    bookError:null,
    bookLoading:false,
    returnSuccess:false
    
}, action) {
  switch(action.type){
    case actionTypes.CLEAR_RETURN_BOOK: return clearReturnBook(state, action)
    case actionTypes.CLEAR_RETURN_BOOK_ERROR: return clearReturnBookError(state, action)

    case actionTypes.LIB_RETURN_GET_BOOK_START: return getReturningBookStart(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_SUCCESS: return getReturningBookSuccess(state, action)
    case actionTypes.LIB_RETURN_GET_BOOK_FAILED: return getReturningBookFail(state, action)

    case actionTypes.LIB_RETURN_BOOK_START: return returnBookStart(state, action)
    case actionTypes.LIB_RETURN_BOOK_SUCCESS: return returnBookSuccess(state, action)
    case actionTypes.LIB_RETURN_BOOK_FAILED: return returnBookFail(state, action)

    case actionTypes.DELETE_RETURN_BOOK: return deleteReturnBook(state, action)
}
return state
}
 