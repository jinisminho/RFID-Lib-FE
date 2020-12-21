var arrayOfBooks = [{"id":1,"title":"Harry","author":"JK", "isbn-10":"0439708184", "availability": 1},
{"id":2,"title":"Harry2","author":"JK3", "isbn-10":"0439708184", "availability": 1},
{"id":3,"title":"Harry3","author":"JK1", "isbn-10":"0439708184", "availability": 1},
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

var arrayOfBooks2 = [
{"id":1, "stock": 6, "title":"Harry","authors":[{"id":1,"name":"Jk"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":2, "stock": 7,"title":"Harry2","authors":[{"id":1,"name":"k"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":3, "stock": 6,"title":"Harry3","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":4, "stock": 0,"title":"Harry4","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":5, "stock": 5,"title":"Harry5","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kjj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":6, "stock": 13,"title":"Harry6","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"koj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":7, "stock": 10,"title":"Harry7","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kmj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":8, "stock": 11,"title":"Harry8","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
];

// function getBooks(keywords){
//     var obj = {"data": arrayOfBooks, "status":true}
//     return obj
// }

function getBooks(keywords){
    var arr = [];
    var bookArr = arrayOfBooks2;

    for(var i = 0 ; i< bookArr.length; i++){

        var obj = bookArr[i];
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