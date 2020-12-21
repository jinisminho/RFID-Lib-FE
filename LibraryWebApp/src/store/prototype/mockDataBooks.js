var arrayOfBooks = [{"id":1,"title":"Harry","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":2,"title":"Harry2","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":3,"title":"Harry3","author":"J7K", "isbn-10":"0439708184", "availability": 3},
{"id":4,"title":"Harry4","author":"JK", "isbn-10":"0439708184", "availability": 3},
{"id":5,"title":"Harry5","author":"J9K", "isbn-10":"0439708184", "availability": 3},
{"id":6,"title":"Harry6","author":"JK", "isbn-10":"0439708184", "availability": 5},
{"id":7,"title":"Harry7","author":"JoK", "isbn-10":"0439708184", "availability": 6},
{"id":8,"title":"Harry8","author":"J12K", "isbn-10":"0439708184", "availability": 7},
{"id":9,"title":"Harry9","author":"J33K", "isbn-10":"0439708184", "availability": 7},
{"id":10,"title":"Harry10","author":"J41K", "isbn-10":"0439708184", "availability": 12},
{"id":11,"title":"Harry11","author":"J2K", "isbn-10":"0439708184", "availability": 22},
{"id":12,"title":"Harry12","author":"JK", "isbn-10":"0439708184", "availability": 22},
{"id":13,"title":"Harry13","author":"JK", "isbn-10":"0439708184", "availability": 3},
{"id":14,"title":"Harry14","author":"JK", "isbn-10":"0439708184", "availability": 4},
{"id":15,"title":"Harry15","author":"JK", "isbn-10":"0439708184", "availability": 5},
{"id":16,"title":"Harry16","author":"JK", "isbn-10":"0439708184", "availability": 6}];


// function getBooks(keywords){
//     var obj = {"data": arrayOfBooks, "status":true}
//     return obj
// }

function getBooks(keywords){
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

    return {"data": arr, "status":true};
}

export {getBooks}