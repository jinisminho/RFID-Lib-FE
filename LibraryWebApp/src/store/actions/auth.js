import * as actionTypes from './actionTypes'
import axios from '../../axios'
import {responseError} from '../utility'
import {responseErrorForAuth} from '../utility'


export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId,role,avatar,username)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        role:role,
        avatar:avatar,
        username:username
    };
}


export const authFail =(error) =>{
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout =()=>{
    deleteAllCookies()
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (username, password) =>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email:username,
            password:password,
            }
        let url='/auth/login'
        axios.post(url,authData,{withCredentials:true})
        .then(response =>{
            setCookie("Userid",response.data.userId)
            setCookie("Role",response.data.role)
            setCookie("Avatar",response.data.avatar)
            setCookie("Username",response.data.email)
            dispatch(authSuccess(response.data.accessToken, response.data.userId, response.data.role,response.data.avatar,response.data.email))
        })
        .catch(error =>{
            dispatch(responseErrorForAuth(authFail,error))
        })
    }
}
export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = ()=>{
    return dispatch=>{
        const token =getCookie("Authorization")
        if(!token){
            dispatch(logout())
        }else{
                const userId = getCookie("Userid")
                const role= getCookie("Role")
                const avt= getCookie("Avatar")
                const username= getCookie("Username")
                dispatch(authSuccess(token, userId,role,avt,username))
        }
    }
}



export const changePasswordStart = ()=>{
    return{
        type: actionTypes.CHANGE_PASSWORD_FAILED
    };
}
export const changePasswordFailed =(error) =>{
    return{
        type: actionTypes.CHANGE_PASSWORD_FAILED,
        error: error
    }
}
export const changePasswordSuccess = (token)=>{
    return{
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        token:token
    };
}
export const changePassword = (id, current,newPassword) =>{
    return dispatch => {
        dispatch(changePasswordStart());
        const changeData ={
            accountId:id,
            currentPassword:current,
            newPassword :newPassword
        }
        let url='/account/password/change'
        axios.post(url,changeData,{withCredentials:true})
        .then(response =>{
            setCookie("Authorization",response.data)
            dispatch(changePasswordSuccess(response.data))

        })
        .catch(error =>{
            dispatch(responseError(changePasswordFailed,error))
        })
    }
}
export const closeChangePassword = () =>{
        return{
            type: actionTypes.CLOSE_CHANGE_PASSWORD_FAILED,
        };
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
  }
  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}