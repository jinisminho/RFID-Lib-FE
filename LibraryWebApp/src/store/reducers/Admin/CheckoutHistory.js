import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../utility'


const getHistoryStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true,
    deleteSuccess:false,
    updateSuccess:false,
    addSuccess:false
  })
}
const getHistorySuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getHistoryFail = (state, action) =>{
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
    sizePerPage:10,
}, action) {
  switch(action.type){
    case actionTypes.GET_HISTORY_START: return getHistoryStart(state, action)
    case actionTypes.GET_HISTORY_SUCCESS: return getHistorySuccess(state, action)
    case actionTypes.GET_HISTORY_FAILED: return getHistoryFail(state, action)

}
return state
}
 