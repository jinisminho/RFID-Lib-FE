import React from 'react'

const Books = ({books}) => {

    const bookList = books.lenght ? (
        books.map(b => {
            return (
                <div className="collection-item" key={b.code}>
                    <span>{b.code}</span>
                </div>
            )
        })
    ) : null

    return(
        <div className=''>
            book here
            {bookList}
        </div>
    )
}

export default Books