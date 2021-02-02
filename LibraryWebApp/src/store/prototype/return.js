var arrayOfCopy=[{"id":1,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"E28068940000500BB95748AE","barcode":"1231","studentid":1,"studentname":"Khang Nguyen","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg","genres":["Novel"],"borrower":"NTK"},
{"id":2,"book":1,"title":"Harry2","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"E28068940000500BB95750AE","barcode":"1232","studentid":1,"studentname":"Khang Nguyen","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg","genres":["Novel"],"borrower":"NTK"},
{"id":3,"book":2,"title":"Harry3","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"E28068940000400BB9574CAE","barcode":"1233","studentid":1,"studentname":"Khang Nguyen","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg","genres":["Novel"],"borrower":"NTK"},
{"id":4,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"4","barcode":"1234","studentid":1,"studentname":"Khang Nguyen"},
{"id":5,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"5","barcode":"1235","studentid":1,"studentname":"Khang Nguyen"},
{"id":6,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"6","barcode":"1236","studentid":1,"studentname":"Khang Nguyen"},
{"id":7,"book":2,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"7","barcode":"1237","studentid":1,"studentname":"Khang Nguyen"},
{"id":8,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"8","barcode":"1238","studentid":1,"studentname":"Khang Nguyen"},
{"id":9,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"9","barcode":"1239","studentid":1,"studentname":"Khang Nguyen"},
{"id":10,"book":5,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"10","barcode":"12310","studentid":1,"studentname":"Khang Nguyen"},
{"id":11,"book":6,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"11","barcode":"12311","studentid":1,"studentname":"Khang Nguyen"},
{"id":12,"book":7,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"rfidcode":"12","barcode":"12312","studentid":1,"studentname":"Khang Nguyen"}
]
var arrayOfStudents=[
{"id":1,"code":"1","name":"Nguyen Do Nhat Khang","department":"SE","username":"khang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":2,"code":"2","name":"Pham Minh Hoang","department":"SE","username":"hoang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":3,"code":"3","name":"Phan Hoang Tram","department":"SE","username":"tram@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":4,"code":"4","name":"Nguyen Trung Kien","department":"SE","username":"kien@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
{"id":5,"code":"5","name":"Nguyen Quoc Van","department":"SA","username":"van@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
]


function getStudent(rfidcode){
    let rs= null
    arrayOfStudents.forEach(el=>{
        if(el["rfidcode"]==rfidcode){
            rs=el
        }
    })
    return {"data":rs,"status":true}
}

function getBook(rfidcode){
    let rs = null
    let isFind=false
    arrayOfCopy.forEach(el=>{
        if(el["rfidcode"]==rfidcode){
            rs = el
            let m=new Date()
            let returnat = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
            let duedate=new Date("2021/01/29")
            let overdue=2
            rs["returnat"]= returnat
            rs["duedate"]= duedate.toDateString()
            rs["overdue"]= overdue
            rs["fine"]=20000
            isFind=true
        }
    })
    if(isFind){
        return {"data":rs,"status":true}
    }else{
        return {"error":"Book not found","status":false}
    }
}

export {getStudent,getBook}