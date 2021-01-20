var arrayOfStudents = [{"id":1,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":false},
{"id":2,"username":"tramph","name":"Tram","gender":"F", "phone":"0213456789","status":false},
{"id":3,"username":"hoangpm","name":"Hoang","gender":"M", "phone":"0213456789","status":true},
{"id":4,"username":"kiennt","name":"Kien","gender":"M", "phone":"0213456789","status":false},
{"id":5,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":true},
{"id":6,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":false},
{"id":7,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":true},
{"id":8,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":false},
{"id":9,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":true},
{"id":10,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":false},
{"id":11,"username":"khangndn","name":"Khang","gender":"M", "phone":"0213456789","status":true},];

function getStudent(keywords,page,sizePerPage){
    var arr = [];
    for(var i = 0 ; i< arrayOfStudents.length; i++){

        var obj = arrayOfStudents[i];
        var name = obj["username"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(!keywords ? true : name.toLowerCase().includes(keywords.toLowerCase())){
            arr.push(obj);
        }   
    }
    if(arr.length < 1)    return {"err":"Unauthorized","status":false};
    let rs=[]
    if((sizePerPage)*(page)>arr.length){
        rs=[]
    }else{
        for(i=(sizePerPage)*(page);i<sizePerPage*(page+1);i++){
            if(i<arr.length)
                rs.push(arr[i])
        }
    }
    return {"data": rs, "total":arr.length,"status":true};
}
function addStudent(data){
    let id=arrayOfStudents[arrayOfStudents.length-1]["id"]+1
    data["id"]=id
    arrayOfStudents.push(data)
    return {"status":true};
}
function updateStudent(data){
    let id=data["id"]
    arrayOfStudents.forEach((el,idx) => {
        if(el["id"]==id){
            arrayOfStudents[idx]=data
        }
    });
    return {"status":true};
}

function changeStatusStudent(id,status){
    arrayOfStudents.forEach((el,idx) => {
        if(el["id"]==id){
            el["status"]=status
        }
    })
    return {"status":true};
}

export {getStudent, addStudent,updateStudent,changeStatusStudent}