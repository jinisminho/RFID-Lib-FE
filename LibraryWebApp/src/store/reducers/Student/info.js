import * as actionTypes from '../../actions/actionTypes'
import {updateObject} from '../../ultility'


const getRentingInfoStart = (state, action) =>{
  return updateObject(state,{
    error:null, 
    loading:true
  })
}
const getRentingInfoSuccess = (state, action)=>{
  return updateObject(state,{
      data: action.data,
      total:action.total,
      error:null,
      loading:false,
      page:action.page+1,
      sizePerPage: action.sizePerPage
  })
}
const getRentingInfoFail = (state, action) =>{
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
    case actionTypes.STUDENT_GET_RENTINGINFO_START: return getRentingInfoStart(state, action)
    case actionTypes.STUDENT_GET_RENTINGINFO_SUCCESS: return getRentingInfoSuccess(state, action)
    case actionTypes.STUDENT_GET_RENTINGINFO_FAILED: return getRentingInfoFail(state, action)
   
}
return state
}
 