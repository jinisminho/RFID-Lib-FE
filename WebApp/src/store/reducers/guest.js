import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../ultility'

const getBooksStart = (state, action) =>{
  return updateObject(state,{error:null, loading:true})
}
const getBooksSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      error:null,
      loading:false
  })
}
const getBooksFailed = (state, action) =>{
  return updateObject(state,{
      data : [],
      error:action.error,
      loading:false
  })
}

export default function reducer(state = {
  data: null,
  error: null,
  loading: false
}, action) {
  switch(action.type){
    case actionTypes.GET_BOOKS_START: return getBooksStart(state, action)
    case actionTypes.GET_BOOKS_FAILED: return getBooksFailed(state, action)
    case actionTypes.GET_BOOKS_SUCCESS: return getBooksSuccess(state,action)
   
}
return state
}