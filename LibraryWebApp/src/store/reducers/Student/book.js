import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getBookStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
  })
}
const getBookSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getBookFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      total:0,
      page:1,
      sizePerPage:10,
      
  })
}

export default function reducer(state = {
    data: null,
    total:0,
    error:null,
    loading:false,
    page:1,
    sizePerPage:10
}, action) {
  switch(action.type){
    case actionTypes.PATRON_GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.PATRON_GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.PATRON_GET_BOOKS_FAILED: return getBookFail(state, action)
}
return state
}
 