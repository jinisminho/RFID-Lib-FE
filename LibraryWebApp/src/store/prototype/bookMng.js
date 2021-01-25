var arrayOfBooks = [{"id":1,"title":"Harry","sub":"test","ddc":"1231231111","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"NOT_ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":2,"title":"Harry2","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"NOT_ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":3,"title":"Harry3","sub":"test","ddc":"1231231111","author":["J7K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"NOT_ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":4,"title":"Harry4","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":5,"title":"Harry5","sub":"test","ddc":"1231231111","author":["J9K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":6,"title":"Harry6","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":7,"title":"Harry7","sub":"test","ddc":"1231231111","author":["JoK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":8,"title":"Harry8","sub":"test","ddc":"1231231111","author":["J12K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":9,"title":"Harry9","sub":"test","ddc":"1231231111","author":["J33K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":10,"title":"Harry10","sub":"test","ddc":"1231231111","author":["J41K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":11,"title":"Harry11","sub":"test","ddc":"1231231111","author":["J2K"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42,"status":"ALLOWED_TO_BORROW","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":12,"title":"Harry12","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":42,"status":"OUT_OF_CIRCULATION","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":13,"title":"Harry13","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"OUT_OF_CIRCULATION","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":14,"title":"Harry14","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"OUT_OF_CIRCULATION","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":15,"title":"Harry15","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"OUT_OF_CIRCULATION","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":16,"title":"Harry16","sub":"test","ddc":"1231231111","author":["JK"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"status":"OUT_OF_CIRCULATION","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"}];

function getBooks(keywords,page,sizePerPage){
    var arr = [];
    for(var i = 0 ; i< arrayOfBooks.length; i++){

        var obj = arrayOfBooks[i];
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
function addBooks(data){
    let id=arrayOfBooks[arrayOfBooks.length-1]["id"]+1
    data["id"]=id
    let author=[]
    data["members"].forEach(el => {
        author.push(el["author"])
    });
    data["author"]=author
    delete data["members"]
    arrayOfBooks.push(data)
    return {"status":true};
}

function updateBooks(data){
    let id=data["id"]
    arrayOfBooks.forEach(el => {
        if(el["id"]==id){
            let authors=[]
            data["members"].forEach(author => {
                authors.push(author["author"])
            })
            el["title"]=data["title"]
            el["isbn"]=data["isbn"]
            el["publisher"]=data["publisher"]
            el["language"]=data["language"]
            el["nop"]=data["nop"]
            el["category"]=data["category"]
            el["edition"]=data["edition"]
            el["author"]=authors
            el["status"]=data["status"]
        }
    });
    return {"status":true};
}

function deleteBook(id){
    arrayOfBooks.forEach((el,idx) => {
        if(el["id"]==id){
            arrayOfBooks.splice(idx,1)
        }
    })
    return {"status":true};
}
function copyBook(data){
    
    return {"status":true};
}
export {getBooks, addBooks,updateBooks,deleteBook,copyBook}