import * as mock_data from './mock_data'
import MyUtil from "store/utility"
import * as MyConstant from 'views/Util/Constant'
import moment from 'moment';



export function getBorrowPolicy(page, sizePerPage) {
    var arr = mock_data.borrowPolicy;

    if (arr.length < 1) return { "err": "No policy Found", "status": false };
    let rs = []
    if ((sizePerPage) * (page) > arr.length) {
        rs = []
    } else {
        for (var i = (sizePerPage) * (page); i < sizePerPage * (page + 1); i++) {
            if (i < arr.length)
                rs.push(arr[i])
        }
    }
    return { "data": rs, "total": arr.length, "status": true };

}

export function getPatronPolicy(page, sizePerPage) {
    var arr = mock_data.patronPolicy;

    if (arr.length < 1) return { "err": "No policy Found", "status": false };
    let rs = []
    if ((sizePerPage) * (page) > arr.length) {
        rs = []
    } else {
        for (var i = (sizePerPage) * (page); i < sizePerPage * (page + 1); i++) {
            if (i < arr.length)
                rs.push(arr[i])
        }
    }
    return { "data": rs, "total": arr.length, "status": true };

}

export function getFeePolicies(page, sizePerPage) {
    var arr = mock_data.feePolicy;

    if (arr.length < 1) return { "err": "No policy Found", "status": false };
    let rs = []
    if ((sizePerPage) * (page) > arr.length) {
        rs = []
    } else {
        for (var i = (sizePerPage) * (page); i < sizePerPage * (page + 1); i++) {
            if (i < arr.length)
                rs.push(arr[i])
        }
    }
    return { "data": rs, "total": arr.length, "status": true };

}

export function getFeePolicy() {
    var rs = mock_data.latestFeePolicy;

    return { "data": rs, "status": true };

}

export function getPatronTypes(){
    return {"data": mock_data.patrontypes,"status":true};
}

export function addBorrowPolicy(data){
    let arr = mock_data.borrowPolicy
    let patronTypes = mock_data.patrontypes
    let copyTypes = mock_data.copyTypes
    let id=arr[arr.length-1]["id"]+1
    let copyType
    let patronType


    for(var i = 0 ; i< patronTypes.length; i++){

        var obj = patronTypes[i];
        var pId = obj["id"];


        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(pId == data["patronTypeId"]){
            patronType = obj.name
        }   
    }

    for(var i = 0 ; i< copyTypes.length; i++){

        var obj = copyTypes[i];
        var cId = obj["id"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(cId == data["copyTypeId"]){
            copyType = obj.name
        }   
    }

    data["id"]=id
    data["patronType"]=patronType
    data["bookCopyType"]=copyType

    arr.push(data)
    return {"status":true};
}

export function updateBorrowPolicy(data){
    let arr = mock_data.borrowPolicy
    let id=data["id"]

    arr.forEach(el => {
        if(el["id"]==id){
            el["dueDuration"]=data["dueDuration"]
            el["extendDueDuration"]=data["extendDueDuration"]
            el["maxBorrowNumber"]=data["maxBorrowNumber"]
            el["maxExtendTime"]=data["maxExtendTime"]
        }
    });

    return {"status":true};
}

export function deleteBorrowPolicy(id){
    mock_data.borrowPolicy.forEach((el,idx) => {
        if(el["id"]==id){
            mock_data.borrowPolicy.splice(idx,1)
        }
    })
    return {"status":true};
}

export function updatePatronPolicy(data){
    let arr = mock_data.patronPolicy
    let id=data["id"]

    arr.forEach(el => {
        if(el["id"]==id){
            el["maxBorrowNumber"]=data["maxBorrowNumber"]
        }
    });

    return {"status":true};
}

export function updateFeePolicy(data){
    let arr = mock_data.feePolicy
    let id=arr[arr.length-1]["id"]+1
    let newData =[]

    newData["id"]=id
    newData["documentProcessingFee"]=data["documentProcessingFee"]
    newData["maxPercentageOverdueFine"]=data["maxPercentageOverdueFine"]
    newData["missingDocMultiplier"]=data["missingDocMultiplier"]
    newData["overdueFinePerDay"]=data["overdueFinePerDay"]
    newData["createdAt"]=moment(MyUtil.convertToDate(moment.now())).format(MyConstant.DATETIME)

    mock_data.feePolicy.push(newData)
    return {"status":true};
}