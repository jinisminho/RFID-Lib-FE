var arrayOfCopy=[{"id":1,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"1"},
{"id":2,"book":1,"title":"Harry2","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"2"},
{"id":3,"book":2,"title":"Harry3","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"3"},
{"id":4,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"4"},
{"id":5,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"5"},
{"id":6,"book":1,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"6"},
{"id":7,"book":2,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"7"},
{"id":8,"book":3,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"8"},
{"id":9,"book":4,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"9"},
{"id":10,"book":5,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"10"},
{"id":11,"book":6,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"11"},
{"id":12,"book":7,"title":"Harry","author":["JK","aa"], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4,"code":"12"}
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

function getBook(code){
    let rs = null
    arrayOfCopy.forEach(el=>{
        if(el["code"]==code){
            rs = el
        }
    })
    return {"data":rs,"status":true}
}

export {getStudent,getBook}