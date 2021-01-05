var arrayOfBooks = [{
    "id": 1,
    "title": "Harry",
    "author": ["JK", "aa"],
    "isbn": "0439708184",
    "publisher": "ABC",
    "language": "English",
    "nop": 200,
    "category": "novel",
    "edition": 4
    , "requests": 19
},
    {
        "id": 2,
        "title": "Harry2",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 3,
        "title": "Harry3",
        "author": ["J7K"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 4,
        "title": "Harry4",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 5,
        "title": "Harry5",
        "author": "J9K",
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 6,
        "title": "Harry6",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 7,
        "title": "Harry7",
        "author": ["JoK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 8,
        "title": "Harry8",
        "author": ["J12K"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 9,
        "title": "Harry9",
        "author": ["J33K"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 19
    },
    {
        "id": 10,
        "title": "Harry10",
        "author": ["J41K"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 42
        , "requests": 19
    },
    {
        "id": 11,
        "title": "Harry11",
        "author": ["J2K"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 42
        , "requests": 19
    },
    {
        "id": 12,
        "title": "Harry12",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 42
        , "requests": 40
    },
    {
        "id": 13,
        "title": "Harry13",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 40
    },
    {
        "id": 14,
        "title": "Harry14",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 40
    },
    {
        "id": 15,
        "title": "Harry15",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 2
    },
    {
        "id": 16,
        "title": "Harry16",
        "author": ["JK"],
        "isbn": "0439708184",
        "publisher": "ABC",
        "language": "English",
        "nop": 200,
        "category": "novel",
        "edition": 4
        , "requests": 2
    }];

function getRequestedBooks(keywords, page, sizePerPage) {
    var arr = [];
    for (var i = 0; i < arrayOfBooks.length; i++) {

        var obj = arrayOfBooks[i];
        var title = obj["title"];

        // if(!keywords) {alert ("keywords is false or 0 or undefined or null")}
        if (!keywords ? true : title.toLowerCase().includes(keywords.toLowerCase())) {
            arr.push(obj);
        }
    }
    if (arr.length < 1) return {"err": "Unauthorized", "status": false};
    let rs = []
    if ((sizePerPage) * (page) > arr.length) {
        rs = []
    } else {
        for (i = (sizePerPage) * (page); i < sizePerPage * (page + 1); i++) {
            if (i < arr.length)
                rs.push(arr[i])
        }
    }
    return {"data": rs, "total": arr.length, "status": true};
}

function deleteRequestedBook(id) {
    arrayOfBooks.forEach((el, idx) => {
        if (el["id"] == id) {
            arrayOfBooks.splice(idx, 1)
        }
    })
    return {"status": true};
}

export {getRequestedBooks, deleteRequestedBook}