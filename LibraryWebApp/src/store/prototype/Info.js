import * as mock_data from './mock_data'
import MyUltil from "store/ultility"

// function getRentingInfos() {
//     return {"data": mock_data.rentingInfo, "total":mock_data.rentingInfo.length,"status":true};
// }

function getRentingInfos(studentId) {
    var arr = mock_data.rentingInfo;
    let rs = []
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var stuId = obj.borrower.id;

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if (!studentId ? false : stuId == studentId) {
            rs.push(obj)
        }
    }
    if (rs.length > 0) {
        return { "data": rs, "total": rs.length, "status": true };
    }
    else {
        return { "err": "User Not found", "status": false }
    }
}

function getExtendedHistory() {
    return { "data": mock_data.extendedDueHistory, "total": mock_data.extendedDueHistory.length, "status": true };
}

function addDueDate(studentId, bookId) {
    var arr = mock_data.rentingInfo;
    var arr2 = mock_data.extendedDueHistory;
    const numOfDateToAdd = 7

    for (var i = 0; i < arr.length; i++) {
        var dateDue = arr[i].dateDue;
        var book = arr[i].book;
        var bokId = book["id"];
        var student = arr[i].borrower;
        var stuId = student["id"];
        var newDue = MyUltil.convertToDate(dateDue)
        newDue.setDate(newDue.getDate() + numOfDateToAdd)

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if (!bookId && !studentId ? false : (bokId == bookId && stuId == studentId)) {
            arr2[arr2.length - 1].dateExtended = MyUltil.convertToDate(Date.now())
            arr2.push(
                {
                    "id": arr[arr.length - 1].id + 1,
                    "dateExtended": "",
                    "dateDue": newDue
                }
            );
            return { "status": true };
        }
    }
    return { "err": "Unauthorized", "status": false };
}

function getStudent(code){
    let rs= null
    mock_data.arrayOfStudents.forEach(el=>{
        if(el["code"]==code){
            rs=el
        }
    })
    return {"data":rs,"status":true}
}

function getStudentProfile(studentId) {
    var arr = mock_data.studentProfiles;
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var stuId = obj["id"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if (!studentId ? false : stuId == studentId) {
            return { "data": obj, "status": true };
        } else {
            return { "err": "Unauthorized", "status": false }
        }
    }
}

function updateStudentProfile(data) {
    let id = data["id"]
    mock_data.studentProfiles.forEach(el => {
        if (el["id"] == id) {
            el["email"] = data["email"]
            el["fullname"] = data["fullname"]
            el["phone"] = data["phone"]
            el["imgSrc"] = data["imgSrc"]
        }
    });
    return { "status": true };
}

function getWishlist(page, sizePerPage) {
    let rs = []
    let arr = mock_data.wishList
    if ((sizePerPage) * (page) > arr.length) {
        rs = arr
    } else {
        for (var i = (sizePerPage) * (page); i < sizePerPage * (page + 1); i++) {
            if (i < arr.length)
                rs.push(arr[i])
        }
    }
    return { "data": rs, "total": arr.length, "status": true };
}

function addWishlist(bookid) {
    var arr = mock_data.arrayOfBooks;
    var arr2 = mock_data.wishList;
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var id = obj["id"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if (!bookid ? false : id == bookid) {
            arr2.push(obj);
            return { "status": true };
        }
    }
    return { "err": "Unauthorized", "status": false };
}

export { getRentingInfos, getExtendedHistory, getStudentProfile, updateStudentProfile, getWishlist, addWishlist, addDueDate , getStudent}