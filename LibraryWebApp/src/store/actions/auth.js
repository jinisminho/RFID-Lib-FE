import * as actionTypes from './actionTypes'
import axios from '../../axios'

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
    localStorage.removeItem('expiryDate')
    deleteAllCookies()
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime)
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
        axios.post(url,authData,{withCredentials:true,credentials:"include"})
        .then(response =>{
            const expiryDate= new Date(response.data.expiryDate)
            localStorage.setItem('expiryDate', expiryDate)
            setCookie("Userid",response.data.userId)
            setCookie("Role",response.data.role)
            setCookie("Avatar",response.data.avatar)
            setCookie("Username",response.data.email)
            dispatch(authSuccess(response.data.accessToken, response.data.userId, response.data.role,response.data.avatar,response.data.email))
            dispatch(checkAuthTimeOut(response.data.expiryDate- (new Date().getTime())))
        })
        .catch(err =>{
            dispatch(authFail(err.response.data.message))
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
            const expiryDate = new Date(localStorage.getItem('expiryDate'))
            if(expiryDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = getCookie("Userid")
                const role= getCookie("Role")
                const avt= getCookie("Avatar")
                const username= getCookie("Username")
                dispatch(authSuccess(token, userId,role,avt,username))
                dispatch(checkAuthTimeOut(expiryDate.getTime()- (new Date().getTime())))
            }
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
export const changePasswordSuccess = (token, userId)=>{
    return{
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        idToken: token,
        userId: userId
    };
}
export const changePassword = (id, newPass) =>{
    return dispatch => {
        dispatch(changePasswordStart());
        const changeData ={
            idToken:id,
            password:newPass,
            returnSecureToken :true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlIksbOmIbctM2LrIvzxQJznoKcyIUEJI'
        // if(!isSignup){
        ///       url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlIksbOmIbctM2LrIvzxQJznoKcyIUEJI'
        //     
        // }
        axios.post(url,changeData)
        .then(response =>{
            const expiryDate= new Date(new Date().getTime() + response.data.expiryDate*1000)
            localStorage.setItem('accessToken',response.data.accessToken)
            localStorage.setItem('expiryDate', expiryDate)
            localStorage.setItem('userId', response.data.userId)
            dispatch(changePasswordSuccess(response.data.accessToken, response.data.userId))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err =>{
            dispatch(changePasswordFailed(err.response.data.error))
        })
    }
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