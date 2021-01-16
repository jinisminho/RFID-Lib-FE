import { CheckOutlined } from "@material-ui/icons"

var arrayOfCopy=[{"id":1,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"1","barcode":"1231"},
{"id":2,"book":1,"title":"Harry2","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"2","barcode":"1232"},
{"id":3,"book":2,"title":"Harry3","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"3","barcode":"1233"},
{"id":4,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"4","barcode":"1234"},
{"id":5,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"5","barcode":"1235"},
{"id":6,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"6","barcode":"1236"},
{"id":7,"book":2,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"7","barcode":"1237"},
{"id":8,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"8","barcode":"1238"},
{"id":9,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"9","barcode":"1239"},
{"id":10,"book":5,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"10","barcode":"12310"},
{"id":11,"book":6,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"11","barcode":"12311"},
{"id":12,"book":7,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"12","barcode":"12312"}
]
var arrayOfStudents=[
{"id":1,"code":"1","name":"Nguyen Do Nhat Khang","department":"SE","username":"khang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":2,"code":"2","name":"Pham Minh Hoang","department":"SE","username":"hoang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":3,"code":"3","name":"Phan Hoang Tram","department":"SE","username":"tram@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":4,"code":"4","name":"Nguyen Trung Kien","department":"SE","username":"kien@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":5,"code":"5","name":"Nguyen Quoc Van","department":"SA","username":"van@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
]


function getStudent(code){
    let rs= null
    arrayOfStudents.forEach(el=>{
        if(el["code"]==code){
            rs=el
        }
    })
    return {"data":rs,"status":true}
}

function getBook(rfidcode){
    let rs = null
    arrayOfCopy.forEach(el=>{
        if(el["rfidcode"]==rfidcode){
            rs = el
        }
    })
    return {"data":rs,"status":true}
}

function checkout(studentid, booklist){
    return {"status":true}
}

function getOverdue(search){
    return {"data":[{"id":1,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"1","barcode":"1231","dateLent": "2020-12-17 15:15:30","dateDue": "2020-12-24 23:59:59"},
    {"id":2,"book":1,"title":"Harry2","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"2","barcode":"1232","dateLent": "2021-01-01 15:15:30","dateDue": "2020-01-08 23:59:59"},
    {"id":3,"book":2,"title":"Harry3","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"3","barcode":"1233","dateLent": "2020-12-19 15:15:30","dateDue": "2020-12-26 23:59:59"}],"status":true}
}

export {getStudent,getBook,checkout,getOverdue}