function login(username,password){
    if(username=="test" && password=="test"){
        return {"data":{
            "accessToken":"213",
            "expiryDate":"2020-12-30",
            "userId":"1",
            "role":"ADMIN",
            "username":"test"
        },"status":true}
    }
    else if(username=="st" && password=="st"){
        return {"data":{
            "accessToken":"214",
            "expiryDate":"2020-12-30",
            "userId":"2",
            "role":"STUDENT",
            "username":"st"
        },"status":true}
    }
    else{
        return {"err":"Unauthorized","status":false}
    }
}

export {login}