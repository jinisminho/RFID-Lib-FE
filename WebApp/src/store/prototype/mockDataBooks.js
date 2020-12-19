var arrayOfBooks = [{"id":1,"title":"Harry","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":1,"title":"Harry2","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":1,"title":"Harry3","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":1,"title":"Harry4","author":"JK", "isbn-10":"0439708184", "availability": 1}];


// function getBooks(keywords){
//     var obj = {"data": arrayOfBooks, "status":true}
//     console.log(obj)
//     return obj
// }

function getBooks(keywords){
    var arr = [];

    for(var i = 0 ; i< arrayOfBooks.length; i++){

        var obj = arrayOfBooks[i];
        var title = obj["title"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")} 
        if(!keywords ? title.includes(keywords) : title.toLowerCase().includes(keywords.toLowerCase())){
            arr.push(obj);
        }   
    }
    if(arr.length < 1)    return {"err":"Unauthorized","status":false};

    return {"data": arr, "status":true};
}

export {getBooks}