import {arrayOfBooks, wishList} from "./mock_data"



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
        rs=arr
    }else{
        for(i=(sizePerPage)*(page);i<sizePerPage*(page+1);i++){
            if(i<arr.length)
                rs.push(arr[i])
        }
    }
    return {"data": rs, "total":arr.length,"status":true};
}



export {getBooks}