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
    {
        name: "availability",
        label: "Test",
        options: {
            customBodyRenderLite: (dataIndex) => {
                let val = this.state.data[dataIndex].availability;

                return val > 0 ? "Available" : "Out of order";
            }
        }
    }
];

export function COLUMNS_3(data) {
    let thisData = data
    return [
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
        {
            name: "availability",
            label: "Status",
            options: {
                filter: true,
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Available', 'Out of order'],
                    logic(availability, filterVal) {
                        const show =
                            (filterVal.indexOf('Available') >= 0 && availability > 0) ||
                            (filterVal.indexOf('Out of order') >= 0 && availability <= 0);
                        return !show;
                    },
                },
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    let val = thisData[dataIndex].availability;

                    return val > 0 ? "Available" : "Out of order";
                }
            }
        }
    ];
} 

export function COLUMNS_4(data) {
    let thisData = data
    return [
        {
            name: "title",
            label: "Title",
            options: {
                filter: true,
                filterType: 'textField',
            }
        },
        {
            name: "authors",
            label: "Authors",
            options: {
                // customBodyRenderLite: (dataIndex) => {
                //     let res = "";
                //     let val = []
                //     val = thisData[dataIndex].authors;

                //     val.forEach(element => {
                //         res += element["name"] + "; "
                //     });

                //     return res;
                // }
                customBodyRender: (value, tableMeta, updateValue) => {
                    let res = [];

                    value.forEach(element => {
                        res += element["name"] + "; "
                    });

                    return res;
                }
            }
        },
        {
            name: "stock",
            label: "Status",
            options: {
                filter: true,
                filterType: 'dropdown',
                filterOptions: {
                    names: ['Available', 'Out of order'],
                    logic(stock, filterVal) {
                        const show =
                            (filterVal.indexOf('Available') >= 0 && stock > 0) ||
                            (filterVal.indexOf('Out of order') >= 0 && stock <= 0);
                        return !show;
                    },
                },
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    let val = thisData[dataIndex].stock;

                    return val > 0 ? "Available" : "Out of order";
                }
            }
        }
    ];
} 