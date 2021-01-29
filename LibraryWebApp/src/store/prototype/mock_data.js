export const arrayOfBooks = [
  { "id": 1,"status": "IN_CIRCULATION", "ddc":"1231231111",  "stock": 6, "title": "Harry", "authors": [{ "id": 1, "name": "Jk" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 2,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 7, "title": "Harry2", "authors": [{ "id": 1, "name": "k" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 3,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 6, "title": "Harry3", "authors": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 4,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 0, "title": "Harry4", "authors": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 5,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 5, "title": "Harry5", "authors": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kjj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 6,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 13, "title": "Strange Case of Dr Jekyll and Mr Hyde", "authors": [{ "id": 1, "name": "Robert Louis Stevenson" }], "isbn": "978-0-553-21277-8", "publisher": "Longmans, Green & Co.", "language": "English", "nop": 141, "category": "novel", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 7,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 10, "title": "Sapiens: A Brief History of Humankind", "authors": [{ "id": 1, "name": "Yuval Noah Harari" }], "isbn": "978-0062316097", "publisher": "Harper", "language": "English", "nop": 443, "category": "Non-fiction", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 8,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 11, "title": "Harry8", "authors": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "Rowling" }, { "id": 3, "name": "testing This" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
];

export var wishList = [
  { "id": 6, "stock": 13, "title": "Strange Case of Dr Jekyll and Mr Hyde", "authors": [{ "id": 1, "name": "Robert Louis Stevenson" }], "isbn": "978-0-553-21277-8", "publisher": "Longmans, Green & Co.", "language": "English", "nop": 141, "category": "novel", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
  { "id": 7, "stock": 10, "title": "Sapiens: A Brief History of Humankind", "authors": [{ "id": 1, "name": "Yuval Noah Harari" }], "isbn": "978-0062316097", "publisher": "Harper", "language": "English", "nop": 443, "category": "Non-fiction", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
  { "id": 8, "stock": 11, "title": "Harry8", "authors": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "Rowling" }, { "id": 3, "name": "testing This" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "category": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
];

export const rentingInfo = [
  {
    "id": 1,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "December 24, 2020 15:15:30",
    "dueDate": "December 24, 2020 23:59:59",
    "book": {
      "id": 1,
      "stock": 6,
      "title": "Harry",
      "authors": [
        {
          "id": 1,
          "name": "J. K. Rowling"
        }
      ],
      "isbn": "0439708184",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "category": "novel",
      "edition": 4
    },
    "borrower": {
      "id": 1,
      "name": "John Doe",
      "studentNum": "KR291964"
    }
  },
  {
    "id": 2,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "December 24, 2020 15:15:34",
    "dueDate": "January 20, 2021 23:59:59",
    "book": {
      "id": 2,
      "stock": 8,
      "title": 1984,
      "authors": [
        {
          "id": 2,
          "name": "George Orwell"
        }
      ],
      "isbn": "9780451524935",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "category": "novel",
      "edition": 4
    },
    "borrower": {
      "id": 1,
      "name": "John Doe",
      "studentNum": "KR291964"
    }
  },
  {
    "id": 3,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "",
    "dueDate": "January 20, 2021 23:59:59",
    "book": {
      "id": 3,
      "stock": 2,
      "title": "Lord of the Flies",
      "authors": [
        {
          "id": 3,
          "name": "William Golding"
        },
        {
          "id": 4,
          "name": "Lois Lowry"
        },
        {
          "id": 5,
          "name": "Jennifer Buehler"
        }
      ],
      "isbn": "0399501487",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "category": "novel",
      "edition": 4
    },
    "borrower": {
      "id": 1,
      "name": "John Doe",
      "studentNum": "KR291964"
    }
  },
  {
    "id": 4,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "",
    "dueDate": "December 24, 2020 23:59:59",
    "book": {
      "id": 4,
      "stock": 6,
      "title": "Doctor Sleep",
      "authors": [
        {
          "id": 6,
          "name": "Stephen King"
        }
      ],
      "isbn": "1982131802",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "category": "novel",
      "edition": 4
    },
    "borrower": {
      "id": 1,
      "name": "John Doe",
      "studentNum": "KR291964"
    }
  },
  {
    "id": 5,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "",
    "dueDate": "December 24, 2020 23:59:59",
    "book": {
      "id": 5,
      "stock": 6,
      "title": "Doctor Sleep",
      "authors": [
        {
          "id": 6,
          "name": "Stephen King"
        }
      ],
      "isbn": "1982131802",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "category": "novel",
      "edition": 4
    },
    "borrower": {
      "id": 2,
      "name": "Johny Doen",
      "studentNum": "KR291965"
    }
  },
  {
    "id": 6,
    "borrowedAt": "December 20, 2020 15:15:30",
    "returnedAt": "",
    "dueDate": "July 7, 2021 23:59:59",
    "book": {
      "id": 6,
      "stock": 6,
      "title": "Harmony",
      "authors": [
        {
          "id": 7,
          "name": "Project Itoh"
        }
      ],
      "isbn": "9781421536439",
      "publisher": "Haikasoru",
      "language": " English",
      "nop": 256,
      "category": "novel",
      "edition": 0
    },
    "borrower": {
      "id": 1,
      "name": "John Doe",
      "studentNum": "KR291964"
    }
  },
];

export var extendedDueHistory = [
  {
    "id": 1,
    "renewedAt": "",
    "borrowedAt": "December 20, 2020 15:15:30",
    "dueDate": "December 24, 2020 23:59:59"
  },
  {
    "id": 2,
    "renewedAt": "December 24, 2020 15:15:30",
    "borrowedAt": "December 20, 2020 15:15:30",
    "dueDate": "January 10, 2021 23:59:59"
  },
  {
    "id": 3,
    "renewedAt": "February 1, 2021 15:15:30",
    "borrowedAt": "December 20, 2020 15:15:30",
    "dueDate": "January 30, 2021 23:59:59"
  },

  {
    "id": 4,
    "renewedAt": "February 10, 2021 23:59:59",
    "borrowedAt": "December 20, 2020 15:15:30",
    "dueDate": "February 15, 2021 23:59:59"
  },
]


export var studentProfiles = [
  {
    "id": 1,
    "fullname": "JohnDoe001",
    "email": "KR291964@test.com",
    "phone": "0909291964",
    "department": "SE - IS",
    "imgSrc": ""
  },{
    "id": 2,
    "fullname": "JohnDoe002",
    "email": "KR291965@test.com",
    "phone": "0909291964",
    "department": "SE - IS",
    "imgSrc": ""
  },{
    "id": 3,
    "fullname": "JohnDoe003",
    "email": "KR291966@test.com",
    "phone": "0909291964",
    "department": "IA",
    "imgSrc": ""
  },
]

export const arrayOfStudents=[
  {"id":1,"code":"1","name":"Nguyen Do Nhat Khang","department":"SE","username":"khang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
  {"id":2,"code":"2","name":"Pham Minh Hoang","department":"SE","username":"hoang@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
  {"id":3,"code":"3","name":"Phan Hoang Tram","department":"SE","username":"tram@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
  {"id":4,"code":"4","name":"Nguyen Trung Kien","department":"SE","username":"kien@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
  {"id":5,"code":"5","name":"Nguyen Quoc Van","department":"SA","username":"van@mail.com","img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"},
  ]