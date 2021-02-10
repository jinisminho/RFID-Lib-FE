export const arrayOfBooks = [
  { "id": 1,"status": "IN_CIRCULATION", "ddc":"1231231111",  "stock": 6, "title": "Harry", "author": [{ "id": 1, "name": "Jk" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 2,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 7, "title": "Harry2", "author": [{ "id": 1, "name": "k" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 3,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 6, "title": "Harry3", "author": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 4, "onlyInLibrary": true, "status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 0, "title": "Harry4", "author": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 5,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 5, "title": "Harry5", "author": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "kjj" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 6,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 13, "title": "Strange Case of Dr Jekyll and Mr Hyde", "author": [{ "id": 1, "name": "Robert Louis Stevenson" }], "isbn": "978-0-553-21277-8", "publisher": "Longmans, Green & Co.", "language": "English", "nop": 141, "genre": "novel", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 7,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 10, "title": "Sapiens", "sub": "A Brief History of Humankind", "author": [{ "id": 1, "name": "Yuval Noah Harari" }], "isbn": "978-0062316097", "publisher": "Harper", "language": "English", "nop": 443, "genre": "Non-fiction", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
  { "id": 8,"status": "IN_CIRCULATION", "ddc":"1231231111", "stock": 11, "title": "Nineteen Eighty-Four", "author": [{ "id": 6, "name": "George Orwell" }], "isbn": "1521900515", "publisher": "Independently published","publishYear":2017, "language": "English", "nop": 292, "genre": "novel", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" },
];

export var wishList = [
  { "id": 6, "stock": 13, "title": "Strange Case of Dr Jekyll and Mr Hyde", "author": [{ "id": 1, "name": "Robert Louis Stevenson" }], "isbn": "978-0-553-21277-8", "publisher": "Longmans, Green & Co.", "language": "English", "nop": 141, "genre": "novel", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
  { "id": 7, "stock": 10, "title": "Sapiens: A Brief History of Humankind", "author": [{ "id": 1, "name": "Yuval Noah Harari" }], "isbn": "978-0062316097", "publisher": "Harper", "language": "English", "nop": 443, "genre": "Non-fiction", "edition": 1, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
  { "id": 8, "stock": 11, "title": "Harry8", "author": [{ "id": 1, "name": "J. K. Rowling" }, { "id": 2, "name": "Rowling" }, { "id": 3, "name": "testing This" }], "isbn": "0439708184", "publisher": "ABC", "language": "English", "nop": 200, "genre": "novel", "edition": 4, "img":"https://st2.depositphotos.com/1009634/7235/v/600/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"  },
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
      "author": [
        {
          "id": 1,
          "name": "J. K. Rowling"
        }
      ],
      "isbn": "0439708184",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "genre": "novel",
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
      "author": [
        {
          "id": 2,
          "name": "George Orwell"
        }
      ],
      "isbn": "9780451524935",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "genre": "novel",
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
      "author": [
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
      "genre": "novel",
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
      "author": [
        {
          "id": 6,
          "name": "Stephen King"
        }
      ],
      "isbn": "1982131802",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "genre": "novel",
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
      "author": [
        {
          "id": 6,
          "name": "Stephen King"
        }
      ],
      "isbn": "1982131802",
      "publisher": "ABC",
      "language": "English",
      "nop": 200,
      "genre": "novel",
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
      "author": [
        {
          "id": 7,
          "name": "Project Itoh"
        }
      ],
      "isbn": "9781421536439",
      "publisher": "Haikasoru",
      "language": " English",
      "nop": 256,
      "genre": "novel",
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

  export const userOptions = [
    {
        label: 'Erika',
        value: '4e4cf51f-b406-413a-ae46-2cf06c7aabff',
    },
    {
        label: 'Julia',
        value: 'edad97c7-f2dc-4198-91a9-8f20c7bc67b2',
    },
    {
        label: 'Sarah',
        value: '57d3578a-3583-4290-8bae-596a4da81a8d',
    },
];

export let borrowPolicy =
[
  {
    "id": 1,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "STUDENT",
    "bookCopyType": "TEXTBOOK"
  },
  {
    "id": 2,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "STUDENT",
    "bookCopyType": "REFERENCE"
  },
  {
    "id": 3,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "STUDENT",
    "bookCopyType": "THESIS"
  },
  {
    "id": 4,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "LECTURER",
    "bookCopyType": "TEXTBOOK"
  },
  {
    "id": 5,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "LECTURER",
    "bookCopyType": "REFERENCE"
  },
  {
    "id": 6,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "LECTURER",
    "bookCopyType": "THESIS"
  },
  {
    "id": 7,
    "dueDuration": 7,
    "maxBorrowNumber": 4,
    "maxExtendTime": 2,
    "extendDueDuration": 7,
    "createdAt": "2021-02-03 21:54:23",
    "updatedAt": "2021-02-03 21:54:23",
    "patronType": "LECTURER",
    "bookCopyType": "REFERENCE"
  },
];

export const patronPolicy =
[
  {
    "id": 1,
    "patronType": "STUDENT",
    "maxBorrowNumber": 6
  },
  {
    "id": 2,
    "patronType": "LECTURER",
    "maxBorrowNumber": 10
  }
]

export let feePolicy =
[
  {
    "id": 1,
    "overdueFinePerDay": 2000,
    "maxPercentageOverdueFine": 100,
    "documentProcessingFee": 30000,
    "missingDocMultiplier": 5,
    "createdAt": "2021-02-03 21:54:23"
  },
  {
    "id": 2,
    "overdueFinePerDay": 2000,
    "maxPercentageOverdueFine": 100,
    "documentProcessingFee": 30000,
    "missingDocMultiplier": 5,
    "createdAt": "2021-02-04 21:54:23"
  },
  {
    "id": 3,
    "overdueFinePerDay": 2000,
    "maxPercentageOverdueFine": 100,
    "documentProcessingFee": 30000,
    "missingDocMultiplier": 5,
    "createdAt": "2021-02-05 21:54:23"
  },
]

export const latestFeePolicy =
[
  {
    "id": 1,
    "overdueFinePerDay": 2000,
    "maxPercentageOverdueFine": 100,
    "documentProcessingFee": 30000,
    "missingDocMultiplier": 5,
    "createdAt": "2021-02-03 21:54:23"
  }
]

export const patrontypes =
[
  {
    "id": 1,
    "name": "STUDENT",
  },
  {
    "id": 2,
    "name": "LECTURER",
  }
]

export const copyTypes = [
  {
      name: 'Test - Super Rare',
      id: 1,
  },
  {
      name: 'Test - Unique',
      id: 2,
  },
  {
      name: 'Test - Common',
      id: 3,
  },
]