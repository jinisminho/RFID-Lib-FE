import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


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

const getWhislistStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
  })
}
const getWhislistSuccess = (state, action)=>{
  return updateObject(state,{
      whislistData: action.data,
      whislistTotalSize:action.total,
      whislistPage:action.page+1,
      loading:false
  })
}
const getWhislistFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      whislistTotalSize:0,
      whislistPage:1,
      
  })
}

export default function reducer(state = {
    data: null,
    total:0,
    error:null,
    loading:false,
    page:1,
    sizePerPage:10,
    whislistData: null,
    whislistTotalSize: null,
}, action) {
  switch(action.type){
    case actionTypes.STUDENT_GET_BOOKS_START: return getBookStart(state, action)
    case actionTypes.STUDENT_GET_BOOKS_SUCCESS: return getBookSuccess(state, action)
    case actionTypes.STUDENT_GET_BOOKS_FAILED: return getBookFail(state, action)
    case actionTypes.STUDENT_GET_WHISLIST_START: return getWhislistStart(state, action)
    case actionTypes.STUDENT_GET_WHISLIST_SUCCESS: return getWhislistSuccess(state, action)
    case actionTypes.STUDENT_GET_WHISLIST_FAILED: return getWhislistFail(state, action)  
}
return state
}
 