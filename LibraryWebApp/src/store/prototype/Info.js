import * as mock_data from './mock_data'

function getRentingInfos() {
    return {"data": mock_data.rentingInfo, "total":mock_data.rentingInfo.length,"status":true};
}

function getExtendedHistory() {
    return {"data": mock_data.extendedDueHistory, "total":mock_data.extendedDueHistory.length,"status":true};
}

function getStudentProfile(studentId) {
    var arr = mock_data.studentProfiles;
    for(var i = 0 ; i< arr.length; i++){
        var obj = arr[i];
        var stuId = obj["id"];
        
        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(!studentId ? false : stuId == studentId){
            return {"data": obj,"status":true};
        } else {
            return {"err":"Unauthorized","status":false}
        }   
    }
}

function updateStudentProfile(data){
    let id=data["id"]
    mock_data.studentProfiles.forEach(el => {
        if(el["id"]==id){
            el["email"]=data["email"]
            el["fstName"]=data["fstName"]
            el["lstName"]=data["lstName"]
            el["imgSrc"]=data["imgSrc"]
        }
    });
    return {"status":true};
}

export { getRentingInfos, getExtendedHistory , getStudentProfile, updateStudentProfile}