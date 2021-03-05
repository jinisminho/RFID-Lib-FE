import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'


const authStart = (state, action) =>{
  return updateObject(state,{error:null, loading:true,changePasswordSuccess:false})
}
const authSuccess = (state, action)=>{
  return updateObject(state,{
      token: action.idToken,
      userId: action.userId,
      username:action.username,
      error:null,
      loading:false,
      role:action.role,
      avatar:action.avatar,
      changePasswordSuccess:false
  })
}


const authFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      changePasswordSuccess:false
  })
}

const authLogout = (state, action) =>{
  return updateObject( state, {
    username:null,
    role:null,
    token: null,
    userId: null,
    avatar:null,
    error: null,
    loading: false,
    changePasswordSuccess:false
  })
}

const changePasswordStart = (state, action) =>{
  return updateObject(state,{error:null, loading:true,changePasswordSuccess:false})
}
const changePasswordSuccess = (state, action)=>{
  return updateObject(state,{
      error:null,
      loading:false,
      changePasswordSuccess:true,
      token:action.token
  })
}
const changePasswordFail = (state, action) =>{
  return updateObject(state,{
      error:action.error,
      loading:false,
      changePasswordSuccess:false
  })
}
const closeChangePasswordFail = (state, action) =>{
  return updateObject(state,{
      error:null,
      loading:false,
      changePasswordSuccess:false
  })
}


const setRedirectPath = (state,action) =>{
  return updateObject(state, {authRedirectPath: action.path})
}


export default function reducer(state = {
  username:null,
  role:null,
  token: null,
  userId: null,
  avatar:null,
  error: null,
  loading: false,
  changePasswordSuccess:false,
  authRedirectPath: '/'
}, action) {
  switch(action.type){
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAILED: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
    case actionTypes.CHANGE_PASSWORD_START: return changePasswordStart(state, action)
    case actionTypes.CHANGE_PASSWORD_FAILED: return changePasswordFail(state, action)
    case actionTypes.CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state,action)
    case actionTypes.CLOSE_CHANGE_PASSWORD_FAILED: return closeChangePasswordFail(state,action)
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state,action)
   
}
return state
}