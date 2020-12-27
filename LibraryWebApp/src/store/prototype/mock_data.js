export const arrayOfBooks = [
{"id":1, "stock": 6, "title":"Harry","authors":[{"id":1,"name":"Jk"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":2, "stock": 7,"title":"Harry2","authors":[{"id":1,"name":"k"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":3, "stock": 6,"title":"Harry3","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":4, "stock": 0,"title":"Harry4","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":5, "stock": 5,"title":"Harry5","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kjj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":6, "stock": 13,"title":"Harry6","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"koj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":7, "stock": 10,"title":"Harry7","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kmj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
{"id":8, "stock": 11,"title":"Harry8","authors":[{"id":1,"name":"J. K. Rowling"},{"id":2,"name":"kj"}], "isbn":"0439708184", "publisher":"ABC","language":"English","nop":200,"category":"novel","edition":4},
];

export const rentingInfo = [
  {
    "id": 1,
    "dateLent": "December 20, 2020 15:15:30",
    "dateReturned": "December 24, 2020 15:15:30",
    "dateDue": "December 24, 2020 23:59:59",
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
    "dateLent": "December 20, 2020 15:15:30",
    "dateReturned": "December 24, 2020 15:15:34",
    "dateDue": "January 20, 2021 23:59:59",
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
    "dateLent": "December 20, 2020 15:15:30",
    "dateReturned": "",
    "dateDue": "January 20, 2021 23:59:59",
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
    "dateLent": "December 20, 2020 15:15:30",
    "dateReturned": "",
    "dateDue": "December 24, 2020 23:59:59",
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
  }
];

export const extendedDueHistory = [
  {
    "id": 1,
    "dateExtended": "December 20, 2020 15:15:30",
    "dateDue": "December 24, 2020 23:59:59"
  },
  {
    "id": 2,
    "dateExtended": "December 24, 2020 15:15:30",
    "dateDue": "January 10, 2021 23:59:59"
  },
  {
    "id": 3,
    "dateExtended": "February 1, 2021 15:15:30",
    "dateDue": "January 30, 2021 23:59:59"
  },
  
  {
    "id": 4,
    "dateExtended": "",
    "dateDue": "February 15, 2021 23:59:59"
  },

  {
    "id": 5,
    "dateExtended": "September 2, 2021 15:15:30",
    "dateDue": "September 1, 2021 23:59:59"
  },

  {
    "id": 6,
    "dateExtended": "",
    "dateDue": "September 15, 2021 23:59:59"
  },
]