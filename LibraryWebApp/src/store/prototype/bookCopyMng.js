var arrayOfBooks = [{"id":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":2,"title":"Harry2","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":3,"title":"Harry3","author":["J7K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":4,"title":"Harry4","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":5,"title":"Harry5","author":"J9K", "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":6,"title":"Harry6","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":7,"title":"Harry7","author":["JoK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":8,"title":"Harry8","author":["J12K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":9,"title":"Harry9","author":["J33K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":10,"title":"Harry10","author":["J41K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":11,"title":"Harry11","author":["J2K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":12,"title":"Harry12","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42},
{"id":13,"title":"Harry13","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":14,"title":"Harry14","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":15,"title":"Harry15","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":16,"title":"Harry16","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4}];

var arrayOfCopy=[{"id":1,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"123123123"},
{"id":2,"book":1,"title":"Harry2","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"111111111"},
{"id":3,"book":2,"title":"Harry3","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"222222222"},
{"id":4,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"333333333"},
{"id":5,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"444444444"},
{"id":6,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"555555555"},
{"id":7,"book":2,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"666666666"},
{"id":8,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"777777777"},
{"id":9,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"888888888"},
{"id":10,"book":5,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"999999999"},
{"id":11,"book":6,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"121212121"},
{"id":12,"book":7,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"1311313131"}
]
function getBooks(){
    return {"data": arrayOfBooks, "status":true};
}
function getCopy(keywords,page,sizePerPage){
    var arr = [];
    for(var i = 0 ; i< arrayOfCopy.length; i++){

        var obj = arrayOfCopy[i];
        var title = obj["title"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(!keywords ? true : title.toLowerCase().includes(keywords.toLowerCase())){
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
function addCopy(data){
    let id=arrayOfCopy[arrayOfCopy.length-1]["id"]+1
    let rs={}
    for(var i = 0 ; i< arrayOfBooks.length; i++){
        if(data["book"]==arrayOfBooks[i]["id"]){
            let tmp = arrayOfBooks[i]
            delete tmp["id"]
            rs=tmp
        }
    }
    rs["id"]=id
    rs["code"]=data["code"]
    arrayOfCopy.push(rs)
    return {"status":true};
}
function updateCopy(data){
    let id=data["id"]
    arrayOfCopy.forEach(el => {
        if(el["id"]==id){
            el["code"]=data["code"]
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
export {getBooks, getCopy,addCopy,updateCopy,deleteCopy}