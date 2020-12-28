import {arrayOfBooks} from "./mock_data"

function getBooks(keywords){
    var arr = [];
    var bookArr = arrayOfBooks;

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