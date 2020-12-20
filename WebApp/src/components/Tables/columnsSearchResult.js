export const COLUMNS = [
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Author',
        accessor: 'author'
    },
    {
        Header: 'ISBN-10',
        accessor: 'isbn-10'
    },
    {
        Header: 'Availability',
        accessor: 'availability'
    },
]

export const COLUMNS_2 = [
    {
     name: "title",
     label: "Title",
     options: {
      filter: true,
      filterType: 'textField',
     }
    },
    {
     name: "author",
     label: "Author",
    },
    {
     name: "isbn-10",
     label: "ISBN-10",
    },
    {
     name: "availability",
     label: "Availability",
     options: {
      filter: true,
      sort: false,
      filterType: 'dropdown',
     }
    },
   ];