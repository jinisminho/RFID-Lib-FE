var arrayOfBooks = [{"id":1,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708181", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":2,"title":"Harry2","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708182", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":3,"title":"Harry3","sub":"test","ddc":"1231231111","author":["J7K"], "isbn":"0439708183", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":4,"title":"Harry4","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":5,"title":"Harry5","sub":"test","ddc":"1231231111","author":["J9K"], "isbn":"0439708185", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":6,"title":"Harry6","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708186", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":7,"title":"Harry7","sub":"test","ddc":"1231231111","author":["JoK"], "isbn":"0439708187", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":8,"title":"Harry8","sub":"test","ddc":"1231231111","author":["J12K"], "isbn":"0439708188", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":9,"title":"Harry9","sub":"test","ddc":"1231231111","author":["J33K"], "isbn":"0439708189", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":10,"title":"Harry10","sub":"test","ddc":"1231231111","author":["J41K"], "isbn":"04397081810", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":11,"title":"Harry11","sub":"test","ddc":"1231231111","author":["J2K"], "isbn":"0439708111", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":12,"title":"Harry12","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708112", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":13,"title":"Harry13","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"04397081813", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":14,"title":"Harry14","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708114", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":15,"title":"Harry15","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708115", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":16,"title":"Harry16","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708116", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4}];

var arrayOfCopy=[{"id":1,"book":1,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"1","barcode":"1231","price":123,"status":"PREPARING"},
{"id":2,"book":1,"title":"Harry2","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"2","barcode":"1232","price":123,"status":"READY"},
{"id":3,"book":2,"title":"Harry3","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"3","barcode":"1233","price":123,"status":"READY"},
{"id":4,"book":3,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"4","barcode":"1234","price":123,"status":"READY"},
{"id":5,"book":4,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"5","barcode":"1235","price":123,"status":"READY"},
{"id":6,"book":1,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"6","barcode":"1236","price":123,"status":"READY"},
{"id":7,"book":2,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"7","barcode":"1237","price":123,"status":"READY"},
{"id":8,"book":3,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"8","barcode":"1238","price":123,"status":"READY"},
{"id":9,"book":4,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"9","barcode":"1239","price":123,"status":"READY"},
{"id":10,"book":5,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"10","barcode":"12310","price":123,"status":"READY"},
{"id":11,"book":6,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"11","barcode":"12311","price":123,"status":"READY"},
{"id":12,"book":7,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"12","barcode":"12312","price":123,"status":"READY"}
]
function getBooks(){
    return {"data": arrayOfBooks, "status":true};
}
function getCopy(keywords,page,sizePerPage,select){
    var arr = [];
    for(var i = 0 ; i< arrayOfCopy.length; i++){

        var obj = arrayOfCopy[i];
        var title = obj["title"];
        var status=obj["status"]
        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if((!keywords ? true : title.toLowerCase().includes(keywords.toLowerCase())) && (select.length==0?true:select.includes(status))){
            arr.push(obj);
        }   
    }
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
function addCopy(data){
    // let id=arrayOfCopy[arrayOfCopy.length-1]["id"]+1
    let arr_rs=[]
    let rs={}
    let isFind=false
    for(var i = 0 ; i< arrayOfBooks.length; i++){
        if(data["isbn"]==arrayOfBooks[i]["isbn"]){
            isFind=true
            let tmp = arrayOfBooks[i]
            delete tmp["id"]
            rs=tmp
        }
    }
    if(!isFind){
        return {"status":false,"error":"Book not found"}
    }
    let tmp_rs=JSON.parse(JSON.stringify(rs))
    tmp_rs["price"]=data["price"]
    tmp_rs["barcode"]=[]
    for(var i=0;i<data['noc'];i++){
        let tmp=JSON.parse(JSON.stringify(rs))
        tmp["id"]=arrayOfCopy[arrayOfCopy.length-1]["id"]+1
        tmp["barcode"]="ABC123"+i
        tmp["status"]="PREPARING"
        arr_rs.push(tmp)
        tmp_rs["barcode"].push(tmp["barcode"])
    }
    arrayOfCopy.push(...arr_rs)
    return {"data":tmp_rs,"status":true};
}
function updateCopy(data){
    let id=data["id"]
    arrayOfCopy.forEach(el => {
        if(el["id"]==id){
            el["rfidcode"]=data["rfidcode"]
        }
    });
    return {"status":true};
}

function deleteCopy(id){
    arrayOfCopy.forEach((el,idx) => {
        if(el["id"]==id){
            arrayOfCopy.splice(idx,1)
        }
    })
    return {"status":true};
}
function getBookCopyStatus(){
    return {"data":[{ value: 'READY', label: 'READY' },
    { value: 'PREPARING', label: 'PREPARING' }],"status":true};
}
export {getBooks, getCopy,addCopy,updateCopy,deleteCopy,getBookCopyStatus}